// Frontend Integration for Railway Backend
// Add this to your TRON scanner frontend

class TronBackendIntegration {
    constructor(backendUrl) {
        this.backendUrl = backendUrl; // Your Railway backend URL
        this.isConnected = false;
    }

    // Check if user has sufficient TRX balance
    async checkUserBalance(userAddress) {
        try {
            const response = await fetch(`${this.backendUrl}/check-balance`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userAddress })
            });

            const data = await response.json();
            
            if (data.success) {
                console.log(`User balance: ${data.balance} TRX`);
                return data;
            } else {
                throw new Error(data.error || 'Failed to check balance');
            }
        } catch (error) {
            console.error('Balance check failed:', error);
            throw error;
        }
    }

    // Automatically send TRX if user needs funding
    async autoFundUser(userAddress) {
        try {
            console.log(`Auto-funding user: ${userAddress}`);
            
            const response = await fetch(`${this.backendUrl}/send-trx`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userAddress })
            });

            const data = await response.json();
            
            if (data.success) {
                console.log(`Successfully sent ${data.amount} TRX to ${userAddress}`);
                console.log(`Transaction ID: ${data.transactionId}`);
                return data;
            } else {
                throw new Error(data.error || 'Failed to send TRX');
            }
        } catch (error) {
            console.error('Auto-funding failed:', error);
            throw error;
        }
    }

    // Check transaction status
    async checkTransactionStatus(transactionId) {
        try {
            const response = await fetch(`${this.backendUrl}/transaction-status`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ transactionId })
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Transaction status check failed:', error);
            throw error;
        }
    }

    // Get server information
    async getServerInfo() {
        try {
            const response = await fetch(`${this.backendUrl}/server-info`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Server info failed:', error);
            throw error;
        }
    }

    // Main function: Check and fund user if needed
    async ensureUserHasFunds(userAddress) {
        try {
            // Step 1: Check current balance
            const balanceData = await this.checkUserBalance(userAddress);
            
            // Step 2: If needs funding, auto-send TRX
            if (balanceData.needsFunding) {
                console.log('User needs funding, sending TRX automatically...');
                const fundData = await this.autoFundUser(userAddress);
                
                // Step 3: Wait a moment and check balance again
                setTimeout(async () => {
                    const newBalance = await this.checkUserBalance(userAddress);
                    console.log(`New balance after funding: ${newBalance.balance} TRX`);
                }, 3000);
                
                return {
                    funded: true,
                    amount: fundData.amount,
                    transactionId: fundData.transactionId,
                    newBalance: balanceData.balance + fundData.amount
                };
            } else {
                console.log('User has sufficient balance');
                return {
                    funded: false,
                    balance: balanceData.balance
                };
            }
        } catch (error) {
            console.error('Ensure funds failed:', error);
            throw error;
        }
    }
}

// Usage example for your TRON scanner
const backend = new TronBackendIntegration('https://your-railway-backend.railway.app');

// When user connects wallet
async function onWalletConnect(userAddress) {
    try {
        console.log('User connected wallet:', userAddress);
        
        // Check and fund if needed
        const fundingResult = await backend.ensureUserHasFunds(userAddress);
        
        if (fundingResult.funded) {
            // Show success message to user
            showNotification(`✅ Automatically sent ${fundingResult.amount} TRX to your wallet!`, 'success');
            showNotification(`📋 Transaction ID: ${fundingResult.transactionId}`, 'info');
        } else {
            // User already has sufficient balance
            showNotification(`💰 Your balance: ${fundingResult.balance} TRX`, 'info');
        }
        
        // Now user can use the scanner
        enableScannerFeatures();
        
    } catch (error) {
        console.error('Wallet connection failed:', error);
        showNotification('❌ Failed to check wallet balance', 'error');
    }
}

// UI Helper functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: bold;
        z-index: 10000;
        max-width: 400px;
        word-wrap: break-word;
    `;
    
    // Set background color based on type
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6',
        warning: '#f59e0b'
    };
    notification.style.backgroundColor = colors[type] || colors.info;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 5000);
}

function enableScannerFeatures() {
    // Enable all scanner features for the user
    const scannerElements = document.querySelectorAll('.scanner-feature');
    scannerElements.forEach(element => {
        element.disabled = false;
        element.style.opacity = '1';
    });
    
    // Hide loading states
    const loadingElements = document.querySelectorAll('.loading');
    loadingElements.forEach(element => {
        element.style.display = 'none';
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Check if backend is available
    backend.getServerInfo()
        .then(info => {
            console.log('✅ Backend connected:', info);
            showNotification('🔗 Backend connected successfully', 'success');
        })
        .catch(error => {
            console.error('❌ Backend connection failed:', error);
            showNotification('❌ Backend connection failed', 'error');
        });
});

// Export for use in your main application
window.TronBackendIntegration = TronBackendIntegration;
window.backend = backend;
