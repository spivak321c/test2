"use client"

// Custom AdminJS Dashboard Component

import type React from "react"
import { useEffect, useState } from "react"
import { Box, H2, H5, Text, Button } from "@adminjs/design-system"
import { ApiClient } from "adminjs"

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalMerchants: 0,
    pendingApplications: 0,
    pendingPayouts: 0,
    totalPayoutsAmount: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const api = new ApiClient()
        // Fetch dashboard statistics
        const response = await api.getDashboard()
        setStats(response.data)
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <Box padding="xxl">
        <Text>Loading dashboard...</Text>
      </Box>
    )
  }

  return (
    <Box padding="xxl">
      <H2 marginBottom="xl">Merchant Admin Dashboard</H2>

      <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))" gridGap="lg" marginBottom="xxl">
        <Box bg="white" padding="xl" borderRadius="default" boxShadow="card" border="default">
          <H5 color="grey60">Total Merchants</H5>
          <Text fontSize="xxl" fontWeight="bold" color="primary100">
            {stats.totalMerchants}
          </Text>
        </Box>

        <Box bg="white" padding="xl" borderRadius="default" boxShadow="card" border="default">
          <H5 color="grey60">Pending Applications</H5>
          <Text fontSize="xxl" fontWeight="bold" color="warning">
            {stats.pendingApplications}
          </Text>
        </Box>

        <Box bg="white" padding="xl" borderRadius="default" boxShadow="card" border="default">
          <H5 color="grey60">Pending Payouts</H5>
          <Text fontSize="xxl" fontWeight="bold" color="info">
            {stats.pendingPayouts}
          </Text>
        </Box>

        <Box bg="white" padding="xl" borderRadius="default" boxShadow="card" border="default">
          <H5 color="grey60">Total Payouts Amount</H5>
          <Text fontSize="xxl" fontWeight="bold" color="success">
            NGN {stats.totalPayoutsAmount.toLocaleString()}
          </Text>
        </Box>
      </Box>

      <Box marginTop="xxl">
        <H5 marginBottom="lg">Quick Actions</H5>
        <Box display="flex" gap="default">
          <Button variant="primary" as="a" href="/admin/resources/merchant_applications">
            Review Applications
          </Button>
          <Button variant="primary" as="a" href="/admin/resources/payouts">
            Manage Payouts
          </Button>
          <Button variant="primary" as="a" href="/admin/resources/merchants">
            View Merchants
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default Dashboard
