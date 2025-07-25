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
        <CardTitle className="text-xl sm:text-3xl font-bold font-manrope">Recipients</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-3 px-2 sm:px-4 text-sm sm:text-lg font-semibold font-manrope text-gray-700 uppercase tracking-wider">NAME</th>
                <th className="text-left py-3 px-2 sm:px-4 text-sm sm:text-lg font-semibold font-manrope text-gray-700 uppercase tracking-wider hidden sm:table-cell">NUMBER</th>
                <th className="text-left py-3 px-2 sm:px-4 text-sm sm:text-lg font-semibold font-manrope text-gray-700 uppercase tracking-wider hidden sm:table-cell">LANGUAGE</th>
                <th className="text-left py-3 px-2 sm:px-4 text-sm sm:text-lg font-semibold font-manrope text-gray-700 uppercase tracking-wider">STATUS</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recipients.map((recipient) => (
                <tr key={recipient.id} className="hover:bg-gray-50">
                  <td className="py-3 px-2 sm:px-4 text-sm text-gray-900 font-medium">
                    <div className="flex flex-col sm:block">
                      <span className="font-medium">{recipient.name}</span>
                      <span className="text-xs text-gray-500 sm:hidden">{recipient.number}</span>
                      <span className="text-xs text-gray-500 sm:hidden">{recipient.language}</span>
                    </div>
                  </td>
                  <td className="py-3 px-2 sm:px-4 text-sm text-gray-900 hidden sm:table-cell">{recipient.number}</td>
                  <td className="py-3 px-2 sm:px-4 text-sm text-gray-900 hidden sm:table-cell">{recipient.language}</td>
                  <td className="py-3 px-2 sm:px-4">
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