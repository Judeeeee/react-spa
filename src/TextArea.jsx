import React, { useState } from "react";

export default function TextArea({ inputText }) {
  const [placeholder, setPlaceholder] = useState(inputText);
  return (
    <textarea
      name="content"
      id="content"
      value={placeholder}
      onChange={(e) => setPlaceholder(e.target.value)}
      rows={15}
    />
  );
}
