"use client"

// Custom action component for processing payouts

import type React from "react"
import { useState } from "react"
import { Box, Button, MessageBox, Text } from "@adminjs/design-system"
import type { ActionProps } from "adminjs"
import { ApiClient } from "adminjs"

const ProcessPayoutAction: React.FC<ActionProps> = (props) => {
  const { record, resource } = props
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleProcessPayout = async () => {
    if (!confirm("Are you sure you want to process this payout?")) {
      return
    }

    setLoading(true)
    setMessage(null)

    try {
      const api = new ApiClient()
      const response = await api.recordAction({
        resourceId: resource.id,
        actionName: "process",
      })

      setMessage({
        type: "success",
        text: "Payout processing initiated successfully!",
      })

      // Reload the page after 2 seconds
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error.message || "Failed to process payout",
      })
    } finally {
      setLoading(false)
    }
  }

  const payoutStatus = record.params.status

  return (
    <Box padding="xxl">
      <Text fontSize="h4" marginBottom="lg">
        Process Payout
      </Text>

      {message && (
        <MessageBox
          message={message.text}
          variant={message.type === "success" ? "success" : "danger"}
          marginBottom="lg"
        />
      )}

      <Box marginBottom="lg">
        <Text>
          <strong>Merchant ID:</strong> {record.params.merchantId}
        </Text>
        <Text>
          <strong>Amount:</strong> NGN {record.params.amount}
        </Text>
        <Text>
          <strong>Status:</strong> {payoutStatus}
        </Text>
      </Box>

      {payoutStatus === "pending" ? (
        <Button variant="primary" onClick={handleProcessPayout} disabled={loading}>
          {loading ? "Processing..." : "Process Payout"}
        </Button>
      ) : (
        <MessageBox message={`This payout is already ${payoutStatus}`} variant="info" />
      )}
    </Box>
  )
}

export default ProcessPayoutAction
