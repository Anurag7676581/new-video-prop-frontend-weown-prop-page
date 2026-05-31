import React from 'react';
import Chatbot from './Chatbot';
import styles from './styles.module.css';

const ChatbotDemo = () => {
  return (
    <div className={styles.demoContainer}>
      <div className={styles.demoHeader}>
        <h1>AI Property Assistant Demo</h1>
        <p>Experience the power of AI-driven property search with natural language queries</p>
      </div>
      
      <div className={styles.demoContent}>
        <div className={styles.demoSection}>
          <h2>🎯 How It Works</h2>
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>💬</div>
              <h3>Natural Language</h3>
              <p>Ask for properties in plain English</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🔍</div>
              <h3>Smart Filtering</h3>
              <p>AI understands your preferences</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🏠</div>
              <h3>Instant Results</h3>
              <p>Get relevant properties instantly</p>
            </div>
          </div>
        </div>

        <div className={styles.demoSection}>
          <h2>💡 Try These Queries</h2>
          <div className={styles.queryExamples}>
            <div className={styles.queryCard}>
              <h4>Location-based</h4>
              <ul>
                <li>"Show me houses near metro stations"</li>
                <li>"Properties near airport"</li>
                <li>"Houses near mall"</li>
              </ul>
            </div>
            <div className={styles.queryCard}>
              <h4>Property Type</h4>
              <ul>
                <li>"Show me villas"</li>
                <li>"Commercial properties"</li>
                <li>"Studio apartments"</li>
              </ul>
            </div>
            <div className={styles.queryCard}>
              <h4>Investment</h4>
              <ul>
                <li>"High yield properties"</li>
                <li>"Properties with good ROI"</li>
                <li>"Investment properties"</li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.demoSection}>
          <h2>🚀 Get Started</h2>
          <p>Click the AI Assistant button in the navbar or use the floating chat button to start your property search!</p>
          <div className={styles.ctaButton}>
            <span>AI Assistant is ready to help you find your dream property!</span>
          </div>
        </div>
      </div>

      {/* Chatbot Component */}
      <Chatbot />
    </div>
  );
};

export default ChatbotDemo;
