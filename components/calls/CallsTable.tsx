import React from 'react'
import { Eye, MoreVertical, Flag, Play, Trash2, ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import { Call } from './types'
import { STATUS_COLORS, TYPE_COLORS } from './constants'

interface CallsTableProps {
  calls: Call[]
  actionMenuOpen: string | null
  noteMenuOpen: string | null
  onActionMenuToggle: (callId: string | null) => void
  onNoteMenuToggle: (callId: string | null) => void
  onDeleteCall: (callId: string) => void
}

export default function CallsTable({
  calls,
  actionMenuOpen,
  noteMenuOpen,
  onActionMenuToggle,
  onNoteMenuToggle,
  onDeleteCall
}: CallsTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-manrope font-bold">CALLER</TableHead>
            <TableHead className="font-manrope font-bold">NUMBER</TableHead>
            <TableHead className="font-manrope font-bold">DATE & TIME</TableHead>
            <TableHead className="font-manrope font-bold">
              <div className="flex items-center space-x-1">
                <span>DURATION</span>
                <ArrowUpDown className="w-4 h-4" />
              </div>
            </TableHead>
            <TableHead className="font-manrope font-bold">TYPE</TableHead>
            <TableHead className="font-manrope font-bold">
              <div className="flex items-center space-x-1">
                <span>STATUS</span>
                <ArrowUpDown className="w-4 h-4" />
              </div>
            </TableHead>
            <TableHead className="font-manrope font-bold">ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {calls.map((call) => (
            <TableRow
              key={call.id}
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => window.location.href = `/calls/${call.id}`}
            >
              <TableCell className="font-manrope font-bold">{call.caller}</TableCell>
              <TableCell className="font-manrope font-bold">{call.number}</TableCell>
              <TableCell className="font-manrope font-bold">{call.dateTime}</TableCell>
              <TableCell className="font-manrope font-bold">{call.duration}</TableCell>
              <TableCell>
                <Badge className={TYPE_COLORS[call.type]}>
                  {call.type.charAt(0).toUpperCase() + call.type.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={STATUS_COLORS[call.status]}>
                  {call.status.charAt(0).toUpperCase() + call.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
                  <Link href={`/calls/${call.id}`}>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>

                  {/* Action Menu Dropdown */}
                  <DropdownMenu open={actionMenuOpen === call.id} onOpenChange={(open) => onActionMenuToggle(open ? call.id : null)}>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                      <DropdownMenuItem className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 cursor-pointer">
                        <Play className="w-4 h-4" />
                        <span className="text-sm font-manrope">Play audio</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 cursor-pointer"
                        onClick={() => onDeleteCall(call.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="text-sm font-manrope">Delete Record</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Note Menu Dropdown */}
                  <DropdownMenu open={noteMenuOpen === call.id} onOpenChange={(open) => onNoteMenuToggle(open ? call.id : null)}>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`h-8 w-8 p-0 ${call.isFlagged ? 'text-red-500' : 'text-gray-400'}`}
                      >
                        <Flag className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-80 bg-white rounded-lg shadow-lg border border-gray-200 p-4">
                      <div className="relative">
                        <div className="text-sm text-gray-700 leading-relaxed">
                          <p className="font-semibold mb-2">Note:</p>
                          <p>This is your AI agent's</p>
                          <p>default behavior — automatically</p>
                          <p>generated based on your setup.</p>
                          <p>You can tweak it below or launch</p>
                          <p>your agent as is.</p>
                        </div>
                        <div className="absolute -bottom-2 -right-2">
                          <Avatar className="h-8 w-8 border-2 border-yellow-400">
                            <AvatarImage src="/images/user-profile.jpg" />
                            <AvatarFallback>U</AvatarFallback>
                          </Avatar>
                        </div>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
} 