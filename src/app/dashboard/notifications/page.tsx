import { Bell, Check, Clock, Settings, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">
            Manage your notifications and stay updated
          </p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </button>
      </div>

      {/* Notification controls */}
      <div className="flex space-x-4">
        <button className="flex items-center space-x-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-green-700 transition-colors">
          <Check className="w-4 h-4" />
          <span>Mark All Read</span>
        </button>
        <button className="flex items-center space-x-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
          <X className="w-4 h-4" />
          <span>Clear All</span>
        </button>
      </div>

      {/* Notifications list */}
      <div className="space-y-4">
        {/* Today */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Today</h3>
          <div className="space-y-3">
            <Card className="border-l-4 border-l-green-500 dark:border-l-green-400">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-green-100 rounded-full dark:bg-green-900 dark:text-green-200">
                      <Bell className="w-4 h-4 text-purple-500 dark:text-green-200" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">
                        Meal Plan Ready
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your weekly meal plan has been generated based on your
                        preferences.
                      </p>
                      <div className="flex items-center space-x-1 mt-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>2 hours ago</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-3 h-3 bg-green-500 dark:bg-green-400 rounded-full"></div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <Bell className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">
                        Progress Update
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Great job! You&apos;ve reached 75% of your weight loss
                        goal.
                      </p>
                      <div className="flex items-center space-x-1 mt-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>5 hours ago</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Yesterday */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Yesterday</h3>
          <div className="space-y-3">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-muted rounded-full">
                      <Bell className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">
                        Recipe Suggestion
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        New recipe recommendation: Mediterranean Quinoa Bowl
                      </p>
                      <div className="flex items-center space-x-1 mt-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>1 day ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-muted rounded-full">
                      <Bell className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Reminder</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Don&apos;t forget to log your dinner from last night.
                      </p>
                      <div className="flex items-center space-x-1 mt-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>1 day ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* This week */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">This Week</h3>
          <div className="space-y-3">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-muted rounded-full">
                      <Bell className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">
                        Achievement Unlocked
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Congratulations! You&apos;ve completed a 7-day healthy
                        eating streak.
                      </p>
                      <div className="flex items-center space-x-1 mt-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>3 days ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-muted rounded-full">
                      <Bell className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">
                        Weekly Summary
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your weekly nutrition summary is now available to view.
                      </p>
                      <div className="flex items-center space-x-1 mt-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>5 days ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Empty state (if no notifications) */}
      {/* <div className="text-center py-12">
        <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">No notifications</h3>
        <p className="text-muted-foreground">You&apos;re all caught up! Check back later for updates.</p>
      </div> */}
    </div>
  );
}
