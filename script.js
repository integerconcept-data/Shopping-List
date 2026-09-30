// ----- 1. Create references to the <ul>, <input>, and <button> elements
    const list = document.getElementById('shopping-list');
    const input = document.getElementById('item-input');
    const addButton = document.getElementById('add-button');

    // ----- 2. Create a function that runs in response to the button being clicked
    function addItem(event) {
      // 3. prevent form submission (stops page refresh, especially when pressing Enter)
      event.preventDefault();

      // 4. Store the current value of the input in a variable, trimmed for cleanliness
      const itemText = input.value.trim();

      // Ignore empty or whitespace-only submissions
      if (itemText === '') {
        input.focus();
        return;
      }

      // 5. Clear the input element
      input.value = '';

      // 6. Create three new elements: <li>, <span>, and <button>
      const listItem = document.createElement('li');
      const span = document.createElement('span');
      const deleteButton = document.createElement('button');

      // 7. Append the span and button as children of the list item
      listItem.appendChild(span);
      listItem.appendChild(deleteButton);

      // 8. Set text content: span = input value, button = "Delete"
      span.textContent = itemText;
      deleteButton.textContent = 'Delete';

      // 9. Append the list item to the list
      list.appendChild(listItem);

      // 10. Attach event handler to the delete button so it removes the entire <li>
      deleteButton.addEventListener('click', function() {
        // Remove the whole list item (the <li> containing this button)
        listItem.remove();
      });

      // 11. Focus the input element, ready for the next item
      input.focus();
    }

    // ----- Attach the event listener to the form's submit event
    //   (this catches both clicking the button AND pressing Enter inside the input)
    //   Note: the button has type="submit", so the form's submit event is the best hook.
    const form = document.querySelector('form');
    form.addEventListener('submit', addItem);

    // Bonus: show a subtle empty message if list is empty (purely cosmetic, optional)
    // This does not interfere with the core functionality.
    const observer = new MutationObserver(() => {
      const items = list.querySelectorAll('li');
      const existingMsg = list.querySelector('.empty-message');
      if (items.length === 0) {
        if (!existingMsg) {
          const msg = document.createElement('li');
          msg.className = 'empty-message';
          msg.textContent = 'Your list is empty — add something!';
          msg.style.background = 'transparent';
          msg.style.justifyContent = 'center';
          msg.style.pointerEvents = 'none';
          list.appendChild(msg);
        }
      } else {
        if (existingMsg) existingMsg.remove();
      }
    });
    observer.observe(list, { childList: true });

    // Kick off the empty message if the list starts empty (it does)
    // (trigger a manual check after a tick)
    setTimeout(() => {
      const items = list.querySelectorAll('li');
      if (items.length === 0) {
        const msg = document.createElement('li');
        msg.className = 'empty-message';
        msg.textContent = 'Your list is empty — add something!';
        msg.style.background = 'transparent';
        msg.style.justifyContent = 'center';
        msg.style.pointerEvents = 'none';
        list.appendChild(msg);
      }
    }, 10);

    // Ensure input is focused on page load
    window.addEventListener('load', () => input.focus());
