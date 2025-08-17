import React from 'react'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DashboardCardProps {
  title: string
  value: number | string
  icon: LucideIcon
  trend?: string
  trendUp?: boolean
  className?: string
}

export function DashboardCard({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendUp, 
  className 
}: DashboardCardProps) {
  return (
    <div className={cn(
      "bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow duration-200",
      className
    )}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {trend && (
            <div className="flex items-center mt-2">
              <span className={cn(
                "text-sm font-medium",
                trendUp ? "text-success-600" : "text-danger-600"
              )}>
                {trend}
              </span>
              <span className="text-gray-500 text-sm ml-1">from last month</span>
            </div>
          )}
        </div>
        <div className="bg-healthcare-100 rounded-full p-3">
          <Icon className="w-6 h-6 text-healthcare-600" />
        </div>
      </div>
    </div>
  )
}
