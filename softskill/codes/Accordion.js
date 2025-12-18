import React, { useRef } from "react";

const Accordion = () => {
  // Refs for each content div
  const contentRefs = useRef([]);

  // Function to toggle display
  const toggleContent = (index) => {
    const content = contentRefs.current[index];
    if (content) {
      // Log to console
      console.log(`Toggling accordion item ${index}`);
      // Toggle visibility
      if (content.style.display === "none" || content.style.display === "") {
        content.style.display = "block";
      } else {
        content.style.display = "none";
      }
    }
  };

  // Accordion data
  const items = [
    { title: "What is your return policy?", body: "Our return policy lasts 30 days..." },
    { title: "How to track my order?", body: "You can track your order from the tracking link..." },
    { title: "Can I purchase items again?", body: "Yes, you can reorder from your account..." },
  ];

  return (
    <div style={{ width: "400px", margin: "0 auto" }}>
      {items.map((item, index) => (
        <div key={index} style={{ border: "1px solid #ccc", marginBottom: "5px" }}>
          {/* Accordion Title */}
          <div
            onClick={() => toggleContent(index)}
            style={{
              cursor: "pointer",
              background: "#f1f1f1",
              padding: "10px",
              fontWeight: "bold",
            }}
          >
            {item.title}
          </div>
          {/* Accordion Body */}
          <div
            ref={(el) => (contentRefs.current[index] = el)}
            style={{ display: "none", padding: "10px", background: "#fff" }}
          >
            {item.body}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
