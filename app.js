// --- HUMOROUS LOADER SYSTEM ---
const loaderWrapper = document.getElementById('loader-wrapper');
const loaderPhrase = document.getElementById('loader-phrase');
const loaderFill = document.getElementById('loader-fill');
const loaderPercentage = document.getElementById('loader-percentage');

const rcmHumorPhrases = [
    "Appealing UnitedHealthcare denial #41,208 for Inpatient Sepsis...",
    "Deciphering Aetna's modifier 25 bundling logic (using a magic 8-ball)...",
    "Waiting on hold with BCBS for 45 minutes (listening to MIDI elevator jazz)...",
    "Translating complex billing Excel exports into dashboards actual humans can read...",
    "Explaining Critical Access cost-based reimbursement to Humana (again)...",
    "Clawing back $250,000 from Medicare's administrative black hole...",
    "Teaching automated insurance bots how to feel basic human empathy...",
    "Converting 180-day-old aging AR lines back into liquid capital...",
    "Searching for the lost CPT codes of the physical therapy cap..."
];

let currentPhraseIndex = 0;
let progress = 0;

// Rotate phrases quickly to entertain the user
const phraseInterval = setInterval(() => {
    currentPhraseIndex = (currentPhraseIndex + 1) % rcmHumorPhrases.length;
    if (loaderPhrase) {
        loaderPhrase.style.opacity = 0;
        setTimeout(() => {
            loaderPhrase.textContent = rcmHumorPhrases[currentPhraseIndex];
            loaderPhrase.style.opacity = 1;
        }, 150);
    }
}, 450);

// Load progress simulation
const progressInterval = setInterval(() => {
    progress += Math.floor(Math.random() * 8) + 4; // Randomized jumps
    if (progress >= 100) {
        progress = 100;
        clearInterval(progressInterval);
        clearInterval(phraseInterval);
        
        // Fade out loader screen
        setTimeout(() => {
            if (loaderWrapper) {
                loaderWrapper.style.opacity = 0;
                setTimeout(() => {
                    loaderWrapper.style.display = 'none';
                }, 600); // Wait for transition to complete
            }
        }, 300);
    }
    
    if (loaderFill) loaderFill.style.width = `${progress}%`;
    if (loaderPercentage) loaderPercentage.textContent = `${progress}%`;
}, 90);


// --- MOBILE DRAWER NAVIGATION ---
const mobileToggle = document.getElementById('mobile-menu-toggle');
const mobileDrawer = document.getElementById('mobile-drawer');

function toggleMobileDrawer() {
    if (mobileDrawer.style.display === 'none' || mobileDrawer.style.display === '') {
        mobileDrawer.style.display = 'block';
    } else {
        mobileDrawer.style.display = 'none';
    }
}

window.toggleMobileDrawer = toggleMobileDrawer;

if (mobileToggle) {
    mobileToggle.addEventListener('click', toggleMobileDrawer);
}


// --- TAB NAVIGATION FOR FACILITY EXPERTISE ---
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Deactivate all buttons & panes
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));

        // Activate selected button & matching pane
        button.classList.add('active');
        const targetTab = button.getAttribute('data-tab');
        const targetPane = document.getElementById(`pane-${targetTab}`);
        if (targetPane) {
            targetPane.classList.add('active');
        }
    });
});


// --- INTERACTIVE RECOVERY CALCULATOR ---
const nprSlider = document.getElementById('npr-range');
const denialSlider = document.getElementById('denial-range');
const nprVal = document.getElementById('npr-val');
const denialVal = document.getElementById('denial-val');
const leakageVal = document.getElementById('leakage-val');
const recoveryVal = document.getElementById('recovery-val');
const facilityRadios = document.getElementsByName('calc-facility');
const actionFacilityName = document.getElementById('action-facility-name');
const calcChecklist = document.getElementById('calc-checklist');

const facilityChecklists = {
    ip: {
        name: "Inpatient Hospital Audit Checklist (UnitedHealthcare Focus)",
        items: [
            "Scan historical UHC clinical records for systematic DRG downgrades.",
            "Compare sepsis/pneumonia discharge logs against vitals to contest automated cuts.",
            "Identify high-dollar outstanding accounts exceeding 90 days in aging AR."
        ]
    },
    op: {
        name: "Outpatient Clinic Audit Checklist (Aetna Focus)",
        items: [
            "Audit NCCI edits to locate unbundled procedure codes rejected by Aetna.",
            "Validate modifier 25 and 59 documentation consistency for code compliance.",
            "Verify documentation parameters to recover modifier-related payment leakage."
        ]
    },
    er: {
        name: "Emergency Care Audit Checklist (BCBS Focus)",
        items: [
            "Extract emergency cases downcoded from Level 5 to Level 3 by BCBS.",
            "Audit triage logs to enforce Prudent Layperson statutory guidelines.",
            "Format clinical presentation packets to challenge non-emergent denials."
        ]
    },
    behavioral: {
        name: "Behavioral Health Audit Checklist (Cigna Focus)",
        items: [
            "Reconcile daily clinical therapist logs with Cigna prior-authorization numbers.",
            "Audit inpatient stay medical necessity parameters to reverse retroactive cuts.",
            "Verify patient intake outcome scale records (PHQ-9) to secure therapy extensions."
        ]
    },
    cah: {
        name: "Rural Hospital & CAH Audit Checklist (Humana / Medicare Focus)",
        items: [
            "Validate cost-based Medicare reimbursement rates on commercial Humana HMO claims.",
            "Correct provider-credentialing lags causing administrative rejections.",
            "Flag local encounter claims billed under standardized commercial fee schedules."
        ]
    }
};

function formatCurrency(num) {
    return '$' + num.toLocaleString('en-US', { maximumFractionDigits: 0 });
}

function updateCalculator() {
    const npr = parseFloat(nprSlider.value);
    const denialRate = parseFloat(denialSlider.value) / 100;
    
    nprVal.textContent = formatCurrency(npr);
    denialVal.textContent = (denialRate * 100).toFixed(1) + '%';
    
    const leakage = npr * denialRate;
    const recovery = leakage * 0.65; // Target 65% recovery rate
    
    leakageVal.textContent = formatCurrency(leakage);
    recoveryVal.textContent = formatCurrency(recovery);
    
    let selectedFacility = 'ip';
    for (const radio of facilityRadios) {
        if (radio.checked) {
            selectedFacility = radio.value;
            break;
        }
    }
    
    const checklistData = facilityChecklists[selectedFacility] || facilityChecklists.ip;
    actionFacilityName.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 0.5rem; vertical-align: middle;">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
        ${checklistData.name}
    `;
    
    calcChecklist.innerHTML = '';
    checklistData.items.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-top: 0.15rem; flex-shrink: 0;">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>${item}</span>
        `;
        calcChecklist.appendChild(li);
    });
}

if (nprSlider && denialSlider) {
    nprSlider.addEventListener('input', updateCalculator);
    denialSlider.addEventListener('input', updateCalculator);
    facilityRadios.forEach(radio => {
        radio.addEventListener('change', updateCalculator);
    });
    updateCalculator();
}


// --- SCROLL REVEAL OBSERVER ---
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    reveals.forEach(el => observer.observe(el));
} else {
    reveals.forEach(el => el.classList.add('active'));
}


// --- FAQ ACCORDION LOGIC ---
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        const answer = item.querySelector('.faq-answer');
        const isActive = item.classList.contains('active');
        
        document.querySelectorAll('.faq-item').forEach(otherItem => {
            otherItem.classList.remove('active');
            const otherAnswer = otherItem.querySelector('.faq-answer');
            if (otherAnswer) {
                otherAnswer.style.maxHeight = null;
            }
        });
        
        if (!isActive) {
            item.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }
    });
});
