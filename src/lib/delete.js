import React from "react";
import "./delete.css";

const Delete = (props) => {
  const deleteRecord = async () => {
    // Show a confirmation alert
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this record?"
    );

    if (!userConfirmed) {
      // If user clicks 'Cancel', exit the function
      return;
    }

    try {
      let response = await fetch(
        "http://localhost:3000/api/products/" + props.id,
        {
          method: "DELETE",
        }
      );
      response = await response.json();

      if (response.success) {
        alert("Record deleted successfully");
        // Reload the page to reflect the changes
        window.location.reload();
      } else {
        alert(
          "Error deleting record: " + (response.message || "Unknown error")
        );
      }
    } catch (error) {
      alert("An error occurred: " + error.message);
    }
  };

  return (
    <div>
      <button className="del-btn" onClick={deleteRecord}>
        Delete
      </button>
    </div>
  );
};

export default Delete;
