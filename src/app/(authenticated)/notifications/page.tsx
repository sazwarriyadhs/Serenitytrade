import { Bell, PackageCheck, MessageSquareQuote, Tractor } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const notifications = [
    {
        icon: PackageCheck,
        title: "Offer #OFF-002 Accepted",
        description: "Your offer for Arabica Coffee Beans has been accepted by The Coffee House.",
        time: "2 hours ago",
    },
    {
        icon: MessageSquareQuote,
        title: "New Negotiation Message",
        description: "FreshMart EU sent a new message regarding offer #OFF-001.",
        time: "1 day ago",
    },
    {
        icon: Tractor,
        title: "New Commodity Added",
        description: "'Sun-dried Tomatoes' from Italy is now available for export offers.",
        time: "3 days ago",
    },
    {
        icon: PackageCheck,
        title: "Export Fulfilled",
        description: "Your export of Organic Blueberries to Super Fruct has been marked as fulfilled.",
        time: "1 week ago",
    }
]

export default function NotificationsPage() {
  return (
    <div className="grid gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Notifications</h1>
        <p className="text-muted-foreground">Stay updated with the latest activities on your account.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
          <CardDescription>Here's what you've missed. Mark all as read to clear.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className=" flex items-center p-4 rounded-md bg-secondary/50">
            <Bell className="h-6 w-6 mr-4 text-primary" />
            <div className="grid gap-1">
              <p className="text-sm font-medium">
                Push Notifications
              </p>
              <p className="text-sm text-muted-foreground">
                Receive real-time updates on your devices.
              </p>
            </div>
            <Button variant="outline" size="sm" className="ml-auto">
              Enable
            </Button>
          </div>
          <ul className="divide-y divide-border">
            {notifications.map((notification, index) => (
              <li key={index} className="flex items-start gap-4 py-4">
                <div className="p-2 bg-secondary rounded-full">
                    <notification.icon className="h-5 w-5 text-secondary-foreground" />
                </div>
                <div className="grid gap-1 flex-1">
                  <p className="text-sm font-medium">{notification.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {notification.description}
                  </p>
                </div>
                <time className="text-sm text-muted-foreground shrink-0">
                    {notification.time}
                </time>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
