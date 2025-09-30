"use client"

// Custom show component for merchant details with enhanced UI

import type React from "react"
import { useEffect, useState } from "react"
import { Box, H3, H5, Text, Badge, Button } from "@adminjs/design-system"
import type { ShowPropertyProps } from "adminjs"
import { ApiClient } from "adminjs"

const MerchantDetails: React.FC<ShowPropertyProps> = (props) => {
  const { record } = props
  const [payoutSummary, setPayoutSummary] = useState<any>(null)

  useEffect(() => {
    const fetchPayoutSummary = async () => {
      try {
        const api = new ApiClient()
        const response = await api.resourceAction({
          resourceId: "merchants",
          actionName: "payoutSummary",
        })
        setPayoutSummary(response.data)
      } catch (error) {
        console.error("Failed to fetch payout summary:", error)
      }
    }

    fetchPayoutSummary()
  }, [record.id])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "success"
      case "suspended":
        return "danger"
      case "pending":
        return "warning"
      default:
        return "default"
    }
  }

  return (
    <Box padding="xxl">
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="xl">
        <H3>{record.params.storeName}</H3>
        <Badge variant={getStatusColor(record.params.status)}>{record.params.status}</Badge>
      </Box>

      <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))" gridGap="lg" marginBottom="xxl">
        <Box bg="grey20" padding="lg" borderRadius="default">
          <H5 marginBottom="default">Contact Information</H5>
          <Text>
            <strong>Email:</strong> {record.params.workEmail}
          </Text>
          <Text>
            <strong>Phone:</strong> {record.params.phoneNumber}
          </Text>
          <Text>
            <strong>Business Type:</strong> {record.params.businessType}
          </Text>
        </Box>

        <Box bg="grey20" padding="lg" borderRadius="default">
          <H5 marginBottom="default">Financial Summary</H5>
          <Text>
            <strong>Total Sales:</strong> NGN {record.params.totalSales}
          </Text>
          <Text>
            <strong>Total Payouts:</strong> NGN {record.params.totalPayouts}
          </Text>
          <Text>
            <strong>Commission Rate:</strong> {record.params.commissionRate}%
          </Text>
        </Box>
      </Box>

      {payoutSummary && (
        <Box marginTop="xl">
          <H5 marginBottom="default">Payout Summary</H5>
          <Box bg="white" padding="lg" borderRadius="default" border="default">
            <Text>
              <strong>Pending Amount:</strong> NGN {payoutSummary.pending.amount.toLocaleString()}
            </Text>
            <Text>
              <strong>Pending Splits:</strong> {payoutSummary.pending.splitsCount}
            </Text>
            <Text>
              <strong>Last Payout:</strong>{" "}
              {payoutSummary.merchant.lastPayoutDate
                ? new Date(payoutSummary.merchant.lastPayoutDate).toLocaleDateString()
                : "Never"}
            </Text>
          </Box>
        </Box>
      )}

      <Box marginTop="xl" display="flex" gap="default">
        <Button variant="primary" as="a" href={`/admin/resources/payouts?merchantId=${record.id}`}>
          View Payouts
        </Button>
        <Button variant="primary" as="a" href={`/admin/resources/order_merchant_splits?merchantId=${record.id}`}>
          View Splits
        </Button>
      </Box>
    </Box>
  )
}

export default MerchantDetails
