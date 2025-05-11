import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

// Extended feedback categories with additional gadget/product categories
const INITIAL_CATEGORIES = [
  // UI/Product Experience
  { id: '1', name: 'UI/UX', description: 'User interface and experience issues or suggestions' },
  { id: '2', name: 'Feature Request', description: 'Requests for new features or enhancements' },
  { id: '3', name: 'Bug Report', description: 'Reports of bugs or issues in the product' },
  { id: '4', name: 'Performance', description: 'Issues related to application performance' },
  { id: '5', name: 'Phone Feedback', description: 'Feedback related to smartphones' },
  { id: '6', name: 'Laptop Feedback', description: 'Feedback regarding laptops or notebooks' },
  { id: '7', name: 'Tablet Feedback', description: 'Feedback related to tablets' },
  { id: '8', name: 'Smartwatch Feedback', description: 'Feedback about smartwatches and wearables' },
  { id: '9', name: 'Accessory Feedback', description: 'Feedback on accessories like headphones, chargers, etc.' },
  { id: '10', name: 'Content Feedback', description: 'Comments about documentation, text, or UI content' },
  { id: '11', name: 'Security', description: 'Concerns or suggestions related to data protection or app security' },
  { id: '12', name: 'Account Issues', description: 'Problems related to login, signup, or profile management' },
  { id: '13', name: 'Payment Issues', description: 'Problems with transactions, billing, or subscriptions' },
  { id: '14', name: 'Crash Reports', description: 'App or product crash reports and related issues' },
  { id: '15', name: 'Customer Support Experience', description: 'Feedback about support response or quality' },
  { id: '16', name: 'Navigation & Ease of Use', description: 'Suggestions on making the app more user-friendly' },
  { id: '17', name: 'Compatibility Issues', description: 'Problems with different devices, browsers, or OS' },
  { id: '18', name: 'Localization/Language Feedback', description: 'Issues or suggestions related to translation or local content' },

  // Gadget/Product Specific
  { id: '19', name: 'Smartphone Feedback', description: 'Performance, UI, or hardware issues with smartphones' },
  { id: '20', name: 'Laptop Feedback', description: 'Battery, performance, or hardware feedback for laptops' },
  { id: '21', name: 'Tablet Feedback', description: 'Tablet-specific feedback including stylus and screen issues' },
  { id: '22', name: 'Smartwatch Feedback', description: 'Wearable issues, battery life, sync problems, etc.' },
  { id: '23', name: 'Headphones/Earbuds Feedback', description: 'Sound quality, pairing, and comfort issues' },
  { id: '24', name: 'Gaming Console Feedback', description: 'Console performance, game loading, accessories' },
  { id: '25', name: 'Camera/DSLR Feedback', description: 'Lens performance, image quality, and features' },
  { id: '26', name: 'Bluetooth Speaker Feedback', description: 'Connectivity, battery, and sound feedback' },
  { id: '27', name: 'Monitor/Display Feedback', description: 'Resolution, refresh rate, screen quality issues' },
  { id: '28', name: 'Router/Wi-Fi Device Feedback', description: 'Signal strength, coverage, and performance' },
  { id: '29', name: 'VR/AR Device Feedback', description: 'Issues related to virtual or augmented reality headsets' },
  { id: '30', name: 'Camera Drone Feedback', description: 'Flight performance, video quality, and GPS functionality' },

  // Home & Accessories
  { id: '31', name: 'Smart Home Devices', description: 'Feedback for smart bulbs, thermostats, etc.' },
  { id: '32', name: 'Home Appliance Feedback', description: 'Washing machines, refrigerators, etc.' },
  { id: '33', name: 'Mobile Accessories', description: 'Chargers, cables, phone covers, etc.' },
  { id: '34', name: 'Laptop Accessories', description: 'Mice, keyboards, cooling pads, bags' },
  { id: '35', name: 'Product Packaging', description: 'Complaints or suggestions on box packaging' },
  { id: '36', name: 'Furniture Feedback', description: 'Furniture quality, design, and usage feedback' },
  { id: '37', name: 'Home Entertainment System Feedback', description: 'Issues with home theaters, speakers, or projectors' },
  { id: '38', name: 'Kitchen Appliance Feedback', description: 'Feedback on blenders, mixers, or coffee machines' },

  // General
  { id: '39', name: 'Customer Support Feedback', description: 'Experience with support team or service' },
  { id: '40', name: 'Warranty & Service Feedback', description: 'Repair, warranty claim, or service center experience' },
  { id: '41', name: 'Shipping & Delivery', description: 'Delivery speed, handling, or courier issues' },
  { id: '42', name: 'Product Authenticity', description: 'Suspicions or confirmation of fake/defective products' },
  { id: '43', name: 'Overall Product Satisfaction', description: 'General opinion and review of the product' },
];

const INITIAL_FEEDBACKS = [
  {
    id: '1',
    userId: '1',
    username: 'user',
    category: 'UI/UX',
    title: 'Improve button contrast',
    description: 'The buttons are hard to see on the dashboard page',
    status: 'pending',
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-01-15'),
  },
  {
    id: '2',
    userId: '1',
    username: 'user',
    category: 'Feature Request',
    title: 'Add dark mode',
    description: 'Would love to have a dark mode option for eye comfort',
    status: 'accepted',
    createdAt: new Date('2023-02-10'),
    updatedAt: new Date('2023-02-15'),
  },
];

const INITIAL_RESPONSES = [
  {
    id: '1',
    feedbackId: '2',
    response: 'We love this idea! We\'ve added it to our roadmap for the next quarter.',
    createdAt: new Date('2023-02-15'),
  },
];

const INITIAL_PRODUCT_CHANGES = [
  {
    id: '1',
    title: 'Dark Mode Implementation',
    description: 'Adding dark mode support across all pages',
    feedbackIds: ['2'],
    status: 'in-progress',
    createdAt: new Date('2023-02-20'),
    updatedAt: new Date('2023-03-01'),
  },
];

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedbacks, setFeedbacks] = useState(INITIAL_FEEDBACKS);
  const [responses, setResponses] = useState(INITIAL_RESPONSES);
  const [productChanges, setProductChanges] = useState(INITIAL_PRODUCT_CHANGES);
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);

  const submitFeedback = (feedbackData) => {
    const newFeedback = {
      id: `${feedbacks.length + 1}`,
      ...feedbackData,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setFeedbacks([...feedbacks, newFeedback]);
  };

  const respondToFeedback = (responseData) => {
    const newResponse = {
      id: `${responses.length + 1}`,
      ...responseData,
      createdAt: new Date(),
    };

    setResponses([...responses, newResponse]);

    setFeedbacks(
      feedbacks.map((feedback) =>
        feedback.id === responseData.feedbackId
          ? { ...feedback, status: 'in-review', updatedAt: new Date() }
          : feedback
      )
    );
  };

  const addCategory = (categoryData) => {
    const newCategory = {
      id: `${categories.length + 1}`,
      ...categoryData,
    };

    setCategories([...categories, newCategory]);
  };

  const addProductChange = (changeData) => {
    const newProductChange = {
      id: `${productChanges.length + 1}`,
      ...changeData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setProductChanges([...productChanges, newProductChange]);

    setFeedbacks(
      feedbacks.map((feedback) =>
        changeData.feedbackIds.includes(feedback.id)
          ? { ...feedback, status: 'implemented', updatedAt: new Date() }
          : feedback
      )
    );
  };

  const getUserFeedbacks = (userId) => {
    return feedbacks.filter((feedback) => feedback.userId === userId);
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedbacks,
        responses,
        productChanges,
        categories,
        submitFeedback,
        respondToFeedback,
        addCategory,
        addProductChange,
        getUserFeedbacks,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

FeedbackProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useFeedback = () => {
  const context = useContext(FeedbackContext);
  if (context === undefined) {
    throw new Error('useFeedback must be used within a FeedbackProvider');
  }
  return context;
};
