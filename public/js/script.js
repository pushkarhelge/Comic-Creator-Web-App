document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('comicForm');
    const displayArea = document.getElementById('comicDisplay');
  
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      // Collect input data from the form
      const inputs = [];
      for (let i = 1; i <= 2; i++) { // Change to 2 for Panel 1 and Panel 2
        const input = document.getElementById(`panel${i}`).value;
        inputs.push(input);
      }
  
      // Call the API and display the result
      try {
        const response = await fetch('/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ inputs: inputs.join('\n') }),
        });
  
        if (response.ok) {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('image')) {
            const imageBlob = await response.blob();
            const imageUrl = URL.createObjectURL(imageBlob);
            displayArea.innerHTML = `<img src="${imageUrl}" alt="Generated Comic">`;
          } else {
            console.error('Failed to generate comic. Invalid content type:', contentType);
            alert('Failed to generate comic. Please try again.');
          }
        } else {
          console.error('Failed to generate comic. Server returned:', response.status, response.statusText);
          alert('Failed to generate comic. Please try again.');
        }
      } catch (error) {
        console.error('Error during fetch:', error);
        alert('Failed to generate comic. Please try again.');
      }
    });
  });
  