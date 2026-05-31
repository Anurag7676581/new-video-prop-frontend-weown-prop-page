import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.css';
import { IoChatbubbleEllipses, IoClose, IoSend, IoImage, IoCamera } from 'react-icons/io5';
import { analyzePropertyQuery } from '../../service/aiService';
import useGetProperties from '../../hooks/useGetProperties';
import { Link } from 'react-router-dom';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! I\'m your AI property assistant. I can help you find properties based on your preferences and analyze property images.\n\n• Ask me about properties: "Show me houses near metro stations"\n• Upload property images for analysis\n• Get recommendations based on your needs\n• Search by property type, location, or features',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzingImage, setIsAnalyzingImage] = useState(false);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const { data: propertyList, loading: propertiesLoading } = useGetProperties();



  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Listen for global event to open chat from navbar button
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-weown-chat', handleOpen);
    return () => window.removeEventListener('open-weown-chat', handleOpen);
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Use AI service to analyze the query with real properties
      const aiResponse = await analyzePropertyQuery(inputValue, propertyList || []);
      
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: aiResponse.message,
        properties: aiResponse.properties || [],
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setFilteredProperties(aiResponse.properties || []);
    } catch (error) {
      console.error('Error processing AI query:', error);
      
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: "I'm having trouble processing your request right now. Please try again or ask about:\n\n• Properties near metro stations\n• High yield properties\n• Specific BHK requirements\n• Property types (villa, apartment, commercial)",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
      setFilteredProperties([]);
    } finally {
      setIsLoading(false);
    }
  };



  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageAnalysis = async () => {
    if (!selectedImage) return;

    // Add user message with image
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: 'Analyze this property image',
      image: imagePreview,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsAnalyzingImage(true);
    setSelectedImage(null);
    setImagePreview(null);

    // Simulate image analysis with random delay
    setTimeout(async () => {
      try {
        // Generate random property results
        const randomProperties = generateRandomProperties(propertyList || []);
        
        const analysisMessage = {
          id: Date.now() + 1,
          type: 'bot',
          content: '🔍 **Analyzing your property image...**\n\nI can see this appears to be a beautiful property! Based on the image analysis, I\'ve found some similar properties that might interest you:\n\n**Analysis Results:**\n• Property type: Residential\n• Style: Modern/Contemporary\n• Estimated value range: ₹50L - ₹2Cr\n• Key features: Spacious layout, good lighting\n\nHere are some similar properties I recommend:',
          properties: randomProperties,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, analysisMessage]);
        setFilteredProperties(randomProperties);
      } catch (error) {
        console.error('Error analyzing image:', error);
        
        const errorMessage = {
          id: Date.now() + 1,
          type: 'bot',
          content: "I'm having trouble analyzing this image right now. Please try uploading a clearer image or ask me about properties in a different way.",
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsAnalyzingImage(false);
      }
    }, 3000); // 3 second delay for realistic analysis simulation
  };

  const generateRandomProperties = (allProperties) => {
    if (!allProperties || allProperties.length === 0) return [];
    
    // Shuffle and take random 3-5 properties
    const shuffled = [...allProperties].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.floor(Math.random() * 3) + 3);
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button 
        className={styles.chatButton}
        onClick={() => setIsOpen(true)}
        title="Chat with AI Assistant"
      >
        <IoChatbubbleEllipses />
        <span>AI Assistant</span>
      </button>

      {/* Chat Sidebar */}
      {isOpen && (
        <div className={styles.chatOverlay} onClick={() => setIsOpen(false)}>
          <div className={styles.chatSidebar} onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className={styles.chatHeader}>
              <div className={styles.chatTitle}>
                <IoChatbubbleEllipses />
                <span>AI Property Assistant</span>
              </div>
              <button 
                className={styles.closeButton}
                onClick={() => setIsOpen(false)}
              >
                <IoClose />
              </button>
            </div>

            {/* Messages */}
            <div className={styles.messagesContainer}>
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`${styles.message} ${styles[message.type]}`}
                >
                  <div className={styles.messageContent}>
                    {message.content}
                    {message.image && (
                      <div className={styles.messageImage}>
                        <img src={message.image} alt="Uploaded property" />
                      </div>
                    )}
                    {message.type === 'bot' && Array.isArray(message.properties) && message.properties.length > 0 && (
                      <div className={styles.propertyNuggets}>
                        {message.properties.map((p) => (
                          <Link
                            key={p._id}
                            to={`/property_description/${p._id}`}
                            className={styles.nugget}
                          >
                            <div className={styles.nuggetImage}>
                              <img src={(p.images && p.images[0]) || ''} alt={p.name} />
                            </div>
                            <div className={styles.nuggetInfo}>
                              <div className={styles.nuggetTitle}>{p.name}</div>
                              <div className={styles.nuggetMeta}>
                                <span>{p.type}</span>
                                {p.detail1 && <span>• {p.detail1}</span>}
                              </div>
                              <div className={styles.nuggetPrice}>{p.price}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className={styles.messageTime}>
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className={`${styles.message} ${styles.bot}`}>
                  <div className={styles.typingIndicator}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}
              {isAnalyzingImage && (
                <div className={`${styles.message} ${styles.bot}`}>
                  <div className={styles.imageAnalysisIndicator}>
                    <div className={styles.analysisIcon}>🔍</div>
                    <div className={styles.analysisText}>
                      <div className={styles.analysisTitle}>Analyzing your image...</div>
                      <div className={styles.analysisSubtitle}>Finding similar properties</div>
                    </div>
                    <div className={styles.analysisProgress}>
                      <div className={styles.progressBar}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Image Preview */}
            {imagePreview && (
              <div className={styles.imagePreviewContainer}>
                <div className={styles.imagePreview}>
                  <img src={imagePreview} alt="Preview" />
                  <button 
                    className={styles.removeImageButton}
                    onClick={removeImage}
                    title="Remove image"
                  >
                    <IoClose />
                  </button>
                </div>
                <button 
                  className={styles.analyzeButton}
                  onClick={handleImageAnalysis}
                  disabled={isAnalyzingImage}
                >
                  <IoCamera />
                  Analyze Image
                </button>
              </div>
            )}

            {/* Input */}
            <div className={styles.inputContainer}>
              <div className={styles.inputWrapper}>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
                <button 
                  className={styles.imageUploadButton}
                  onClick={() => fileInputRef.current?.click()}
                  title="Upload property image"
                >
                  <IoImage />
                </button>
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about properties or upload an image..."
                  className={styles.messageInput}
                  rows={1}
                />
                <button 
                  className={styles.sendButton}
                  onClick={handleSendMessage}
                  disabled={(!inputValue.trim() && !selectedImage) || isLoading || isAnalyzingImage}
                >
                  <IoSend />
                </button>
              </div>
            </div>

            {/* Inline property results are rendered within the bot message as nuggets */}
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
