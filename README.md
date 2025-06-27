# Lab 5.2: Interactive User Registration Form

## Reflection Questions
1. How did event.preventDefault() help in handling form submission?  
   **Answer:**  
   `event.preventDefault()` stopped the browser's default form submission behavior, which would reload the page. This allowed me to run custom JavaScript validation logic, display error messages, and only proceed with registration if all fields were valid, providing a smoother user experience.

2. What is the difference between using HTML5 validation attributes and JavaScript-based validation? Why might you use both?  
   **Answer:**  
   HTML5 validation attributes (like `required`, `type="email"`, `minlength`) provide basic, built-in validation and user feedback without extra code. JavaScript-based validation allows for more complex, custom rules and dynamic error messages. Using both ensures robust validation: HTML5 handles simple cases and accessibility, while JavaScript covers advanced requirements and custom feedback.

3. Explain how you used localStorage to persist and retrieve the username. What are the limitations of localStorage for storing sensitive data?  
   **Answer:**  
   I used `localStorage.setItem('savedUsername', username)` to save the username after successful registration, and retrieved it with `localStorage.getItem('savedUsername')` on page load to pre-fill the username field. I also stored an array of all registered usernames in localStorage to check for uniqueness. However, localStorage is not secure—data is stored in plain text and accessible via JavaScript, so it should never be used for sensitive information like passwords or personal data.

4. Describe a challenge you faced in implementing the real-time validation and how you solved it.  
   **Answer:**  
   A challenge was ensuring that error messages updated immediately as the user typed, especially for the confirm password field, which depends on the password field's value. I solved this by adding input event listeners to both fields and calling the confirm password validation function whenever either field changed, ensuring accurate, real-time feedback. Another challenge was implementing username uniqueness, which I solved by maintaining a list of registered usernames in localStorage.

5. How did you ensure that custom error messages were user-friendly and displayed at the appropriate times?  
   **Answer:**  
   I wrote clear, specific error messages for each validation rule and displayed them in dedicated `<span>` elements below each input. The messages appeared only when the input was invalid and were cleared as soon as the input became valid, providing immediate and relevant feedback without overwhelming the user. For username uniqueness, I provided a specific message if the username was already taken.