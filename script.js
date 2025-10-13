// Enhanced Denial Resolution System
const denialProtocols = {
    "CO-16": {
        code: "CO-16",
        description: "Claim/service lacks information",
        category: "Eligibility & Registration",
        steps: [
            "Review patient demographics in fields 2010AA-2010AB for accuracy",
            "Verify insurance eligibility for the date of service",
            "Resubmit claim with complete information within 7 days"
        ],
        documents: "Updated claim form, EOB copy, patient demographics sheet",
        timeline: "2-3 days",
        success_rate: "98%"
    },
    "CO-97": {
        code: "CO-97",
        description: "Payment included in another service",
        category: "Bundling/CCI Edits",
        steps: [
            "Check CCI edits for bundling rules between procedures",
            "Verify appropriate modifier usage (25, 59, XE-XS)",
            "Submit documentation showing separate medical necessity"
        ],
        documents: "Operative reports, progress notes, CCI guidelines",
        timeline: "3-5 days",
        success_rate: "95%"
    },
    "CO-177": {
        code: "CO-177",
        description: "Service not authorized",
        category: "Authorization",
        steps: [
            "Verify if prior authorization was required",
            "Contact payer for retroactive authorization",
            "Submit appeal with medical necessity documentation"
        ],
        documents: "Authorization details, clinical notes, medical necessity proof",
        timeline: "5-7 days",
        success_rate: "92%"
    },
    "PR-204": {
        code: "PR-204",
        description: "Service not covered",
        category: "Benefits",
        steps: [
            "Confirm patient's current benefit plan details",
            "Check for alternative covered procedure codes",
            "Discuss financial responsibility with patient if not covered"
        ],
        documents: "Benefit verification, coverage policy, patient communication",
        timeline: "1-2 days",
        success_rate: "96%"
    }
};

// Modal functions
function showLogin() {
    alert('Login functionality will be available in the next update. For now, you can access all free features.');
}

function showSignup() {
    alert('Account creation coming soon! Currently, all features are available without registration.');
}

// Scroll to denial tool
function scrollToDenialTool() {
    document.getElementById('denial-tool').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// Enhanced denial resolution
function resolveDenial() {
    const codeInput = document.getElementById('denialCode');
    const payerSelect = document.getElementById('payerName');
    const procedureInput = document.getElementById('procedureCode');
    
    const code = codeInput.value.trim().toUpperCase();
    const payer = payerSelect.value;
    const procedure = procedureInput.value.trim();
    
    const resultsDiv = document.getElementById('resolutionResults');
    
    // Clear previous results
    resultsDiv.style.display = 'none';
    resultsDiv.innerHTML = '';
    
    if (!code) {
        showError('Please enter a denial code (e.g., CO-16, PR-204)');
        codeInput.focus();
        return;
    }
    
    const protocol = denialProtocols[code];
    
    if (!protocol) {
        showError(`No resolution found for code: ${code}. Try CO-16, CO-97, CO-177, or PR-204.`);
        return;
    }
    
    // Show loading state
    resultsDiv.innerHTML = `
        <div class="text-center" style="padding: 2rem;">
            <i class="fas fa-spinner fa-spin" style="font-size: 2rem; color: var(--primary);"></i>
            <p style="margin-top: 1rem;">Analyzing denial and generating resolution steps...</p>
        </div>
    `;
    resultsDiv.style.display = 'block';
    
    // Simulate processing delay
    setTimeout(() => {
        displayResolutionProtocol(protocol, payer, procedure);
    }, 1000);
}

function displayResolutionProtocol(protocol, payer, procedure) {
    const resultsDiv = document.getElementById('resolutionResults');
    
    resultsDiv.innerHTML = `
        <div class="resolution-header">
            <h3>${protocol.code}: ${protocol.description}</h3>
            <div class="resolution-meta">
                <span class="category">${protocol.category}</span>
                <span class="success-rate">${protocol.success_rate} Success Rate</span>
            </div>
        </div>
        
        <div class="resolution-timeline">
            <div class="timeline-item">
                <i class="fas fa-clock"></i>
                <span>Estimated Resolution: ${protocol.timeline}</span>
            </div>
        </div>
        
        <div class="resolution-steps">
            <h4>Resolution Steps:</h4>
            <ol>
                ${protocol.steps.map(step => `<li>${step}</li>`).join('')}
            </ol>
        </div>
        
        <div class="documents-needed">
            <h4>Required Documents:</h4>
            <p>${protocol.documents}</p>
        </div>
        
        ${payer ? `
        <div class="payer-guidance">
            <h4>${payer} Specific Notes:</h4>
            <p>Contact ${payer} provider services for specific submission requirements and turnaround times.</p>
        </div>
        ` : ''}
        
        <div class="resolution-actions">
            <button class="btn btn-outline" onclick="saveForLater('${protocol.code}')">
                <i class="fas fa-bookmark"></i>
                Save for Later
            </button>
            <button class="btn btn-primary" onclick="printResolution('${protocol.code}')">
                <i class="fas fa-print"></i>
                Print Steps
            </button>
        </div>
    `;
    
    resultsDiv.style.display = 'block';
    resultsDiv.scrollIntoView({ behavior: 'smooth' });
}

function showError(message) {
    const resultsDiv = document.getElementById('resolutionResults');
    resultsDiv.innerHTML = `
        <div class="error-message">
            <i class="fas fa-exclamation-triangle"></i>
            <p>${message}</p>
        </div>
    `;
    resultsDiv.style.display = 'block';
}

function saveForLater(code) {
    let savedItems = JSON.parse(localStorage.getItem('savedDenials') || '[]');
    if (!savedItems.includes(code)) {
        savedItems.push(code);
        localStorage.setItem('savedDenials', JSON.stringify(savedItems));
        alert(`Saved ${code} to your dashboard for quick access.`);
    } else {
        alert(`${code} is already saved in your dashboard.`);
    }
}

function printResolution(code) {
    alert(`Print functionality would generate a printable version of the resolution steps for ${code}.`);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Add enter key support for denial code input
    document.getElementById('denialCode').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            resolveDenial();
        }
    });
    
    // Load any saved items
    const savedItems = JSON.parse(localStorage.getItem('savedDenials') || '[]');
    if (savedItems.length > 0) {
        console.log('Saved items:', savedItems);
    }
    
    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});