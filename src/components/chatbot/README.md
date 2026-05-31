# AI Property Assistant Chatbot

## Overview
The AI Property Assistant is an intelligent chatbot that helps users find properties using natural language queries. It can understand user preferences and filter properties based on various criteria like location, type, yield, and amenities.

## Features

### 🚀 Natural Language Processing
- Understands conversational queries
- Filters properties based on user intent
- Provides contextual responses

### 🏠 Property Filtering
- **Location-based**: Metro stations, airports, malls, beaches
- **Property Type**: Apartments, villas, commercial spaces, studios
- **BHK**: 1BHK, 2BHK, 3BHK, 4BHK options
- **Yield**: High yield and medium yield properties
- **Amenities**: Swimming pool, garden, security, parking, etc.

### 💬 Interactive Chat Interface
- Real-time chat experience
- Typing indicators
- Message timestamps
- Responsive design for mobile and desktop

### 🎯 Smart Property Suggestions
- Clickable property cards
- Detailed property information
- Direct navigation to property details

## Usage Examples

### Location Queries
- "Show me houses near metro stations"
- "Properties near airport"
- "Houses near mall"
- "Properties near beach"

### Property Type Queries
- "Show me villas"
- "Commercial properties"
- "Studio apartments"
- "Independent houses"

### BHK Queries
- "2BHK apartments"
- "3BHK properties"
- "1BHK near metro"

### Yield Queries
- "High yield properties"
- "Properties with good ROI"
- "Investment properties"

### Combined Queries
- "2BHK apartments near metro with high yield"
- "Villas near airport with swimming pool"
- "Commercial spaces in city center"

## Technical Implementation

### Components
- **Chatbot.jsx**: Main chatbot component
- **styles.module.css**: Chatbot styling
- **aiService.js**: AI logic and property filtering

### AI Service
- Rule-based filtering system
- Gemini API integration ready
- Extensible property database
- Smart query analysis

### Data Structure
Properties include:
- Basic info (name, type, price, area)
- Location and connectivity
- Amenities and features
- Yield potential
- Property age and furnishing

## Integration

### Navbar Integration
The chatbot is integrated into both desktop and mobile navbars:
- Desktop: AI Assistant button in the right section
- Mobile: Floating chat button

### Property Cards
Filtered properties are displayed as clickable cards that integrate with the existing PropertyCard component.

## Future Enhancements

### Gemini API Integration
- Advanced natural language understanding
- Contextual property recommendations
- Personalized user experience

### Additional Features
- Voice input support
- Property comparison
- Saved searches
- Market insights

## Styling

### Design System
- Matches existing UI colors (#7065f0, #FAFAFE, #0F0B3E)
- Consistent with Urbanist font family
- Responsive design for all screen sizes
- Smooth animations and transitions

### Color Palette
- Primary: #7065f0 (Purple)
- Background: #FAFAFE (Light Gray)
- Text: #0F0B3E (Dark Blue)
- Accents: #5a4fdb (Darker Purple)

## Browser Support
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Performance
- Optimized property filtering
- Efficient state management
- Smooth animations
- Responsive interactions
