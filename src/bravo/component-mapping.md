# WORQELY Component Mapping for Bravo Studio

## Screen Components

### 1. Splash Screen
**Bravo Component**: Splash Screen
- **Logo**: WORQELY handshake logo
- **Background**: Gradient primary color
- **Duration**: 3 seconds
- **Transition**: Fade to Login Selection

### 2. Authentication Flow
**Bravo Component**: Authentication Screen
- **Login Types**: Customer, Worker, Admin
- **Fields**: Mobile, Password, User Type
- **Social Login**: Optional
- **Validation**: Client-side and server-side

### 3. Dashboard Components

#### Stats Cards
**Bravo Component**: Card with Stats
```json
{
  "type": "stats_card",
  "data_source": "dashboard_stats",
  "layout": "horizontal",
  "items": [
    {
      "label": "Total Tasks",
      "value": "{totalTasks}",
      "icon": "briefcase"
    },
    {
      "label": "Earnings",
      "value": "₹{totalEarnings}",
      "icon": "rupee"
    }
  ]
}
```

#### Activity Feed
**Bravo Component**: List with Custom Items
```json
{
  "type": "activity_list",
  "data_source": "recent_activity",
  "item_template": {
    "title": "{title}",
    "subtitle": "{description}",
    "timestamp": "{timestamp}",
    "amount": "₹{amount}",
    "icon": "{type}"
  }
}
```

### 4. Service Categories Grid
**Bravo Component**: Grid View
```json
{
  "type": "grid",
  "columns": 2,
  "data_source": "service_categories",
  "item_template": {
    "image": "{image}",
    "title": "{name}",
    "subtitle": "{description}",
    "badge": "{workers_count} workers",
    "action": "navigate_to_workers"
  }
}
```

### 5. Worker List
**Bravo Component**: List View with Filters
```json
{
  "type": "worker_list",
  "data_source": "workers",
  "filters": [
    {
      "type": "rating",
      "min": 1,
      "max": 5
    },
    {
      "type": "price",
      "field": "hourlyRate"
    },
    {
      "type": "availability",
      "options": ["available", "busy", "offline"]
    }
  ],
  "item_template": {
    "avatar": "{profilePhoto}",
    "name": "{fullName}",
    "rating": "{rating}",
    "rate": "₹{hourlyRate}/hr",
    "distance": "{distance}",
    "skills": "{skills}",
    "availability": "{availability}",
    "premium_badge": "{isPremium}"
  }
}
```

### 6. Task Management
**Bravo Component**: Task List with Status
```json
{
  "type": "task_list",
  "data_source": "tasks",
  "status_colors": {
    "posted": "#fbbf24",
    "assigned": "#3b82f6",
    "in-progress": "#f59e0b",
    "completed": "#10b981"
  },
  "item_template": {
    "title": "{title}",
    "description": "{description}",
    "budget": "₹{budget}",
    "location": "{location}",
    "urgency": "{urgency}",
    "status": "{status}",
    "deadline": "{deadline}"
  }
}
```

### 7. Profile Screen
**Bravo Component**: Profile with Sections
```json
{
  "type": "profile",
  "sections": [
    {
      "type": "header",
      "avatar": "{profilePhoto}",
      "name": "{fullName}",
      "subtitle": "{type}",
      "rating": "{rating}"
    },
    {
      "type": "stats_row",
      "items": [
        {
          "label": "Completed",
          "value": "{completedJobs}"
        },
        {
          "label": "Rating",
          "value": "{rating}⭐"
        },
        {
          "label": "Earnings",
          "value": "₹{totalEarnings}"
        }
      ]
    },
    {
      "type": "menu_list",
      "items": [
        {
          "title": "Edit Profile",
          "icon": "edit",
          "action": "edit_profile"
        },
        {
          "title": "Payment Methods",
          "icon": "credit-card",
          "action": "payment_methods"
        },
        {
          "title": "Language",
          "icon": "globe",
          "action": "language_settings"
        },
        {
          "title": "Help & Support",
          "icon": "help-circle",
          "action": "help_support"
        }
      ]
    }
  ]
}
```

## Navigation Structure

### Tab Navigation
```json
{
  "type": "bottom_tab_navigator",
  "tabs": [
    {
      "name": "Home",
      "icon": "home",
      "screen": "Dashboard",
      "badge": "{activeTasks}"
    },
    {
      "name": "Services",
      "icon": "briefcase",
      "screen": "ServiceCategories"
    },
    {
      "name": "Tasks",
      "icon": "list",
      "screen": "TaskList",
      "badge": "{pendingTasks}"
    },
    {
      "name": "Profile",
      "icon": "user",
      "screen": "Profile"
    }
  ]
}
```

### Stack Navigation
```json
{
  "type": "stack_navigator",
  "screens": [
    {
      "name": "Splash",
      "component": "SplashScreen",
      "options": {
        "headerShown": false
      }
    },
    {
      "name": "Auth",
      "component": "AuthScreen",
      "options": {
        "headerShown": false
      }
    },
    {
      "name": "Main",
      "component": "TabNavigator"
    },
    {
      "name": "WorkerDetail",
      "component": "WorkerDetailScreen",
      "options": {
        "title": "Worker Profile"
      }
    },
    {
      "name": "TaskDetail",
      "component": "TaskDetailScreen",
      "options": {
        "title": "Task Details"
      }
    }
  ]
}
```

## Data Flow Mapping

### Authentication Flow
1. **Login Screen** → API: `/auth/login`
2. **Success** → Store token → Navigate to Dashboard
3. **Profile Data** → API: `/users/profile`

### Service Selection Flow
1. **Service Categories** → API: `/services/categories`
2. **Select Category** → API: `/services/categories/{id}/workers`
3. **Select Worker** → Navigate to Worker Detail
4. **Book Service** → API: `/tasks` (POST)

### Task Management Flow
1. **Task List** → API: `/tasks`
2. **Create Task** → API: `/tasks` (POST)
3. **Update Status** → API: `/tasks/{id}/status` (PUT)
4. **Apply to Task** → API: `/tasks/{id}/apply` (PUT)

## Custom Components

### Rating Component
```json
{
  "type": "rating_stars",
  "max_rating": 5,
  "read_only": true,
  "color": "#fbbf24",
  "size": 16
}
```

### Availability Status
```json
{
  "type": "status_indicator",
  "states": {
    "available": {
      "color": "#10b981",
      "text": "Available"
    },
    "busy": {
      "color": "#f59e0b",
      "text": "Busy"
    },
    "offline": {
      "color": "#6b7280",
      "text": "Offline"
    }
  }
}
```

### Language Selector
```json
{
  "type": "language_picker",
  "data_source": "languages",
  "display_field": "nativeName",
  "value_field": "code",
  "current_language": "{user.language}",
  "on_change": "update_language"
}
```

### Premium Badge
```json
{
  "type": "premium_badge",
  "condition": "{isPremium}",
  "style": {
    "background": "linear-gradient(45deg, #fbbf24, #f59e0b)",
    "text": "PREMIUM",
    "color": "white"
  }
}
```