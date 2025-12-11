// Format ID number input (only numbers, max 10 digits)
document.getElementById('idNumber').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (value.length > 10) {
        value = value.slice(0, 10);
    }
    e.target.value = value;
});

// Format service code input (alphanumeric)
document.getElementById('serviceCode').addEventListener('input', function(e) {
    let value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    e.target.value = value;
});

// Form submission
document.getElementById('inquiryForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const serviceCode = document.getElementById('serviceCode').value;
    const idNumber = document.getElementById('idNumber').value;
    const submitBtn = document.getElementById('submitBtn');
    const errorContainer = document.getElementById('errorContainer');
    const resultsContainer = document.getElementById('resultsContainer');
    
    // Hide previous results/errors
    errorContainer.style.display = 'none';
    resultsContainer.style.display = 'none';
    
    // Validation
    if (!serviceCode || serviceCode.length < 3) {
        showError('يرجى إدخال رمز الخدمة بشكل صحيح');
        return;
    }
    
    if (!idNumber || idNumber.length !== 10) {
        showError('يرجى إدخال رقم هوية وطنية أو إقامة صحيح (10 أرقام)');
        return;
    }
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="loading"></span> جاري البحث...';
    
    // Simulate API call
    setTimeout(() => {
        // Check for specific service code and ID
        if (serviceCode.toUpperCase() === 'PSL25082325120' && idNumber === '2550384016') {
            showSpecialResults(serviceCode, idNumber);
        } else {
            // Simulate different results based on ID number
            const lastDigit = parseInt(idNumber[idNumber.length - 1]);
            const isValid = lastDigit % 2 === 0; // Even last digit = valid
            
            if (isValid) {
                showResults(serviceCode, idNumber);
            } else {
                showError('لم يتم العثور على بيانات مطابقة. يرجى التحقق من المعلومات المدخلة');
            }
        }
        
        // Reset button
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'استعلام';
    }, 1500);
});

// Show error message
function showError(message) {
    const errorContainer = document.getElementById('errorContainer');
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    errorContainer.style.display = 'block';
    
    // Scroll to error
    errorContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Show special results for specific code and ID
function showSpecialResults(serviceCode, idNumber) {
    const resultsContainer = document.getElementById('resultsContainer');
    const resultsContent = document.getElementById('resultsContent');
    
    if (!resultsContainer || !resultsContent) {
        console.error('Results container not found');
        return;
    }
    
    resultsContent.innerHTML = `
        <div class="leave-report">
            <div class="report-columns">
                <div class="report-column report-column-left">
                    <div class="report-field">
                        <span class="report-label">الاسم:</span>
                        <span class="report-value">كريم كمال عباس فهمي</span>
                    </div>
                    <div class="report-field">
                        <span class="report-label">تبدأ من:</span>
                        <span class="report-value">2025-12-11</span>
                    </div>
                    <div class="report-field">
                        <span class="report-label">المدة بالأيام:</span>
                        <span class="report-value">1</span>
                    </div>
                    <div class="report-field">
                        <span class="report-label">المسمى الوظيفي:</span>
                        <span class="report-value">طب بشري</span>
                    </div>
                </div>
                
                <div class="report-column report-column-right">
                    <div class="report-field">
                        <span class="report-label">تاريخ إصدار تقرير الإجازة:</span>
                        <span class="report-value">2025-12-11</span>
                    </div>
                    <div class="report-field">
                        <span class="report-label">وحتى:</span>
                        <span class="report-value">2025-12-11</span>
                    </div>
                    <div class="report-field">
                        <span class="report-label">اسم الطبيب:</span>
                        <span class="report-value">محمد أنور محمد مكي</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    resultsContainer.style.display = 'block';
    
    console.log('Special results displayed, container:', resultsContainer);
    console.log('Container display style:', window.getComputedStyle(resultsContainer).display);
    
    // Force display
    resultsContainer.setAttribute('style', 'display: block !important;');
    
    // Scroll to results
    setTimeout(() => {
        resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

// Show results
function showResults(serviceCode, idNumber) {
    const resultsContainer = document.getElementById('resultsContainer');
    const resultsContent = document.getElementById('resultsContent');
    
    if (!resultsContainer || !resultsContent) {
        console.error('Results container not found');
        return;
    }
    
    resultsContent.innerHTML = `
        <div class="leave-report">
            <div class="report-columns">
                <div class="report-column report-column-left">
                    <div class="report-field">
                        <span class="report-label">الاسم:</span>
                        <span class="report-value">كريم كمال عباس فهمي</span>
                    </div>
                    <div class="report-field">
                        <span class="report-label">تبدأ من:</span>
                        <span class="report-value">2025-12-11</span>
                    </div>
                    <div class="report-field">
                        <span class="report-label">المدة بالأيام:</span>
                        <span class="report-value">1</span>
                    </div>
                    <div class="report-field">
                        <span class="report-label">المسمى الوظيفي:</span>
                        <span class="report-value">طب بشري</span>
                    </div>
                </div>
                
                <div class="report-column report-column-right">
                    <div class="report-field">
                        <span class="report-label">تاريخ إصدار تقرير الإجازة:</span>
                        <span class="report-value">2025-12-11</span>
                    </div>
                    <div class="report-field">
                        <span class="report-label">وحتى:</span>
                        <span class="report-value">2025-12-11</span>
                    </div>
                    <div class="report-field">
                        <span class="report-label">اسم الطبيب:</span>
                        <span class="report-value">محمد أنور محمد مكي</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    resultsContainer.style.display = 'block';
    
    console.log('Results container displayed:', resultsContainer.style.display);
    console.log('Results content:', resultsContent.innerHTML.substring(0, 100));
    
    // Scroll to results
    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Add enter key support for form inputs
document.getElementById('serviceCode').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.getElementById('idNumber').focus();
    }
});

document.getElementById('idNumber').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.getElementById('inquiryForm').dispatchEvent(new Event('submit'));
    }
});