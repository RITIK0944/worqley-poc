# WORQELY Bravo Studio Setup Guide

## Prerequisites

1. **Figma Design File**: Have your WORQELY design ready in Figma
2. **Bravo Studio Account**: Sign up at [bravostudio.app](https://bravostudio.app)
3. **API Backend**: Set up the API endpoints (use mock data initially)
4. **Assets**: Prepare all images, icons, and the handshake logo

## Step 1: Import Figma Design

1. **Connect Figma**:
   - Link your Figma account to Bravo Studio
   - Import your WORQELY design file
   - Ensure all screens are properly named

2. **Screen Naming Convention**:
   ```
   Splash Screen
   Login - Customer
   Login - Worker  
   Dashboard - Customer
   Dashboard - Worker
   Service Categories
   Worker List
   Task List
   Profile
   ```

## Step 2: Configure API Connections

1. **Base API Setup**:
   ```
   Base URL: https://api.worqely.com/v1
   Authentication: Bearer Token
   Content-Type: application/json
   ```

2. **API Binding**:
   - Use the mock data from `/bravo/mock-data.json`
   - Configure each endpoint according to `/bravo/api-endpoints.md`
   - Test API connections in Bravo Studio

## Step 3: Component Configuration

### Authentication Setup
1. **Login Screen**:
   - Bind login form to `/auth/login` endpoint
   - Configure user type selection (Customer/Worker)
   - Set up navigation based on user type

2. **Session Management**:
   - Store user token securely
   - Configure auto-login functionality
   - Set up logout functionality

### Dashboard Configuration
1. **Stats Cards**:
   ```json
   Data Source: /dashboard/stats
   Binding: {totalTasks}, {completedTasks}, {totalEarnings}
   Refresh: Pull-to-refresh enabled
   ```

2. **Activity Feed**:
   ```json
   Data Source: /dashboard/recent-activity
   Item Template: Activity card with icon, title, description, amount
   Navigation: Tap to view details
   ```

### Service Categories
1. **Grid Layout**:
   ```json
   Data Source: /services/categories
   Columns: 2
   Item Binding: {name}, {description}, {image}, {workers_count}
   Action: Navigate to worker list with category filter
   ```

### Worker List
1. **List Configuration**:
   ```json
   Data Source: /services/categories/{categoryId}/workers
   Filters: Rating, Price, Distance, Availability
   Sort: Rating (high to low), Price (low to high)
   Item Template: Worker card with avatar, name, rating, rate
   ```

### Task Management
1. **Task List**:
   ```json
   Data Source: /tasks
   Filters: Status, Category, Urgency
   Status Colors: Posted (yellow), Assigned (blue), Completed (green)
   Actions: View details, Apply (for workers), Update status
   ```

## Step 4: Navigation Setup

### Tab Navigation
Configure bottom tab navigation:
```json
{
  "tabs": [
    {
      "name": "Home",
      "icon": "home",
      "screen": "Dashboard"
    },
    {
      "name": "Services", 
      "icon": "briefcase",
      "screen": "ServiceCategories"
    },
    {
      "name": "Tasks",
      "icon": "list", 
      "screen": "TaskList"
    },
    {
      "name": "Profile",
      "icon": "user",
      "screen": "Profile"
    }
  ]
}
```

### Screen Transitions
- **Login → Dashboard**: Fade transition
- **Categories → Workers**: Slide left
- **Worker → Detail**: Modal presentation
- **Back Navigation**: Slide right

## Step 5: Styling Configuration

### Brand Colors
```css
Primary: #030213
Secondary: #1a1a2e  
Accent: #4f46e5
Background: #ffffff
Card Background: #f8f9fa
Text: #1a1a1a
Muted Text: #6b7280
```

### Typography
```css
Heading Font: Poppins
Body Font: Inter
Base Size: 16px
Heading Weights: 600, 500
Body Weight: 400
```

### Component Styling
1. **Cards**: 16px padding, 8px border radius, subtle shadow
2. **Buttons**: Primary button with brand color, 8px border radius
3. **Input Fields**: Clean design with focus states
4. **Lists**: Proper spacing between items, dividers

## Step 6: Multilingual Setup

1. **Language Configuration**:
   ```json
   Default: "en"
   Supported: ["en", "hi", "bn", "te", "mr", "ta", "gu", "kn", "ml", "pa", "or", "as", "ur"]
   API Endpoint: /translations/{languageCode}
   ```

2. **Text Binding**:
   - Bind all static text to translation keys
   - Configure language selector in profile
   - Test language switching functionality

## Step 7: Features Integration

### Location Services
- Enable location permissions
- Bind worker distance calculation
- Configure location-based filtering

### Camera Access
- Profile photo upload
- Task photo documentation
- Before/after work photos

### Push Notifications
- Task assignments
- Payment confirmations  
- Rating requests
- System announcements

### Offline Support
- Cache essential data
- Offline mode indicators
- Sync when connection restored

## Step 8: Testing

### Functional Testing
1. **Authentication Flow**:
   - Test login/signup for both user types
   - Verify session management
   - Test logout functionality

2. **Core Features**:
   - Service category browsing
   - Worker search and filtering
   - Task creation and management
   - Profile management

3. **API Integration**:
   - Test all API endpoints
   - Verify data binding
   - Check error handling

### Device Testing
- **iOS**: Test on iPhone (different screen sizes)
- **Android**: Test on various Android devices
- **Performance**: Check loading times and responsiveness

## Step 9: Deployment Preparation

### App Store Assets
1. **App Icon**: WORQELY handshake logo in required sizes
2. **Screenshots**: Capture key screens in multiple device sizes
3. **App Description**: Localized descriptions for all supported languages

### App Store Information
```
App Name: WORQELY
Subtitle: India's Most Trusted Service Platform
Keywords: workers, services, skilled labor, home services, India
Category: Productivity / Business
Age Rating: 4+ (suitable for all ages)
```

### Privacy & Permissions
- Location access explanation
- Camera access explanation
- Contact access (if needed)
- Privacy policy URL

## Step 10: Launch Configuration

### App Store Connect / Google Play Console
1. **Metadata**: Upload app information in all supported languages
2. **Screenshots**: Provide localized screenshots
3. **App Preview**: Create promotional videos if possible
4. **Pricing**: Free app with optional premium features

### Analytics Setup
- Configure app analytics
- Set up crash reporting
- Monitor user engagement
- Track conversion funnels

### Support Setup
- Configure in-app support
- Set up help documentation
- Create FAQ section
- Support contact information

## Post-Launch Monitoring

### Key Metrics to Track
- User registrations (customers vs workers)
- Task completion rates
- User engagement
- App store ratings and reviews
- API performance

### Iteration Plan
- Monitor user feedback
- Analyze usage patterns
- Plan feature updates
- Optimize performance based on data

## Troubleshooting Common Issues

### API Connection Issues
- Verify API endpoints are accessible
- Check authentication token handling
- Validate JSON response formats

### Layout Issues
- Test on multiple screen sizes
- Verify responsive design
- Check text overflow handling

### Performance Issues
- Optimize image loading
- Implement proper caching
- Monitor memory usage

This guide provides a comprehensive roadmap for setting up WORQELY in Bravo Studio. Follow each step carefully and test thoroughly before launching to ensure a smooth user experience.