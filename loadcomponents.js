/**
 * Enhanced component loader for FastCare application
 * Loads HTML components with improved error handling and loading states
 */

/**
 * Loads an HTML component into a target element
 * @param {string} url - The URL of the component to load
 * @param {string} elementId - The ID of the target element
 * @param {Object} options - Additional options
 * @param {boolean} options.showLoader - Whether to show a loading indicator
 * @param {string} options.errorMessage - Custom error message
 * @returns {Promise} - A promise that resolves when the component is loaded
 */
function loadComponent(url, elementId, options = {}) {
    const targetElement = document.getElementById(elementId);
    
    if (!targetElement) {
        console.error(`Target element with ID "${elementId}" not found`);
        return Promise.reject(new Error(`Target element with ID "${elementId}" not found`));
    }
    
    // Default options
    const defaultOptions = {
        showLoader: true,
        errorMessage: `Failed to load component from "${url}"`
    };
    
    const mergedOptions = { ...defaultOptions, ...options };
    
    // Show loading state if enabled
    if (mergedOptions.showLoader) {
        targetElement.innerHTML = `
            <div class="component-loader py-3 text-center">
                <div class="spinner-border spinner-border-sm text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
                <span class="ml-2">Loading component...</span>
            </div>
        `;
    }
    
    // Fetch the component
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load "${url}": ${response.status} ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            targetElement.innerHTML = data;
            return data; // Return the data for chaining
        })
        .catch(error => {
            console.error('Error loading component:', error);
            
            // Show error in the target element
            targetElement.innerHTML = `
                <div class="alert alert-danger m-3" role="alert">
                    <i class="fas fa-exclamation-circle mr-2"></i>
                    ${mergedOptions.errorMessage}
                    <button type="button" class="close" onclick="this.parentElement.style.display='none'">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            `;
            
            throw error; // Re-throw for promise chaining
        });
}

// Export for ES modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { loadComponent };
}

// Removed duplicate event listener - this was causing conflicts with index.html
