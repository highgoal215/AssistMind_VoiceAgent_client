import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

import { Recipient } from './types'

interface RecipientsTableProps {
  recipients: Recipient[]
}

export default function RecipientsTable({ recipients }: RecipientsTableProps) {
  return (
    <Card className="rounded-lg shadow-sm">
      <CardHeader>
        <CardTitle className="text-3xl font-bold font-manrope">Call Records</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-3 px-4 text-lg font-semibold font-manrope text-gray-700 uppercase tracking-wider">NAME</th>
                <th className="text-left py-3 px-4 text-lg font-semibold font-manrope text-gray-700 uppercase tracking-wider">NUMBER</th>
                <th className="text-left py-3 px-4 text-lg font-semibold font-manrope text-gray-700 uppercase tracking-wider">LANGUAGE</th>
                <th className="text-left py-3 px-4 text-lg font-semibold font-manrope text-gray-700 uppercase tracking-wider">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recipients.map((recipient) => (
                <tr key={recipient.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-900 font-medium">{recipient.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{recipient.number}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{recipient.language}</td>
                  <td className="py-3 px-4">
                    <Badge className={`text-xs px-2 py-1 rounded-full ${recipient.statusColor}`}>
                      {recipient.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
} 