// ==========================================
// JOBFINDER PRO
// ==========================================

// غيّر الرقم إلى رقم WhatsApp تبعك.
// لبنان: 961 ثم رقمك من دون الصفر الأول.
// مثال توضيحي فقط: 96170123456
const WHATSAPP_NUMBER = "96170160784";

// ==========================================
// JOB DATA — وظائف تجريبية
// استبدلها بوظائف حقيقية بعد التحقق منها.
// ==========================================

const sampleJobs = [
  {
    id: "job-1",
    title: "Junior Web Developer",
    company: "Tech Lebanon",
    type: "Full-time",
    location: "Tripoli, Lebanon",
    salary: "$500–$800 / month",
    description:
      "Build and maintain modern websites with a development team. This role is suitable for a motivated junior developer who wants to learn and grow.",
    responsibilities: [
      "Build and update responsive website pages",
      "Work with the team to fix bugs and improve performance",
      "Write clean, maintainable code"
    ],
    requirements: [
      "Basic HTML, CSS and JavaScript knowledge",
      "Willingness to learn and communicate clearly",
      "A portfolio or sample project is a plus"
    ],
    applyUrl: ""
  },

  {
    id: "job-2",
    title: "UI/UX Design Intern",
    company: "Creative Studio",
    type: "Internship",
    location: "Beirut, Lebanon",
    salary: "Paid internship",
    description:
      "Support the design team in creating clear and accessible digital experiences for websites and mobile apps.",
    responsibilities: [
      "Help create wireframes and prototypes",
      "Assist with design reviews",
      "Prepare design assets for developers"
    ],
    requirements: [
      "Basic knowledge of Figma or a similar tool",
      "A willingness to learn",
      "Portfolio or class projects are welcome"
    ],
    applyUrl: ""
  },

  {
    id: "job-3",
    title: "Customer Support Agent",
    company: "Digital Connect",
    type: "Remote",
    location: "Remote",
    salary: "$400–$600 / month",
    description:
      "Help customers by answering questions, documenting issues and guiding them through the product.",
    responsibilities: [
      "Respond to customer questions politely",
      "Record and follow up on issues",
      "Share recurring feedback with the team"
    ],
    requirements: [
      "Good written communication",
      "Reliable internet connection",
      "Comfortable using web-based tools"
    ],
    applyUrl: ""
  },

  {
    id: "job-4",
    title: "Part-time Sales Assistant",
    company: "Smart Retail",
    type: "Part-time",
    location: "Tripoli, Lebanon",
    salary: "$250–$400 / month",
    description:
      "Support daily store operations, help customers find products and keep displays organized.",
    responsibilities: [
      "Welcome and assist customers",
      "Organize products and displays",
      "Support stock and sales records"
    ],
    requirements: [
      "Friendly communication",
      "Reliable and punctual",
      "Previous retail experience is helpful"
    ],
    applyUrl: ""
  },

  {
    id: "job-5",
    title: "Frontend Developer",
    company: "Future Apps",
    type: "Remote",
    location: "Remote",
    salary: "$700–$1,200 / month",
    description:
      "Create responsive user interfaces and work with designers and backend developers to ship product features.",
    responsibilities: [
      "Build reusable interface components",
      "Test layouts on mobile and desktop",
      "Collaborate on code reviews"
    ],
    requirements: [
      "HTML, CSS and JavaScript",
      "Experience with Git",
      "React experience is a plus"
    ],
    applyUrl: ""
  },

  {
    id: "job-6",
    title: "Marketing Assistant",
    company: "Growth Lebanon",
    type: "Full-time",
    location: "Beirut, Lebanon",
    salary: "$400–$650 / month",
    description:
      "Assist with social media planning, content coordination and basic marketing reporting.",
    responsibilities: [
      "Schedule approved social posts",
      "Help prepare campaign materials",
      "Track basic campaign results"
    ],
    requirements: [
      "Clear writing and organization",
      "Familiarity with social platforms",
      "Basic Canva skills are helpful"
    ],
    applyUrl: ""
  }
];

// ==========================================
// ELEMENTS
// ==========================================

const jobGrid = document.getElementById("jobGrid");
const jobCount = document.getElementById("jobCount");
const typeFilter = document.getElementById("typeFilter");
const searchInput = document.getElementById("searchInput");

const jobDialog = document.getElementById("jobDialog");
const applyDialog = document.getElementById("applyDialog");
const jobDetails = document.getElementById("jobDetails");

const startApplyBtn = document.getElementById("startApplyBtn");
const applicationForm = document.getElementById("applicationForm");

let activeJob = null;

// ==========================================
// SAFE HTML OUTPUT
// ==========================================

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[character]));
}

// ==========================================
// FILTER AND SEARCH
// ==========================================

function getFilteredJobs() {
  const selectedType = typeFilter.value;
  const query = searchInput.value.trim().toLowerCase();

  return sampleJobs.filter(job => {
    const typeMatches =
      selectedType === "All types" ||
      job.type === selectedType;

    const searchableText = [
      job.title,
      job.company,
      job.location,
      job.type,
      job.description
    ].join(" ").toLowerCase();

    const searchMatches =
      query === "" || searchableText.includes(query);

    return typeMatches && searchMatches;
  });
}

// ==========================================
// DISPLAY JOB CARDS
// ==========================================

function renderJobs() {
  const jobs = getFilteredJobs();

  jobCount.textContent =
    `${jobs.length} ${jobs.length === 1 ? "job" : "jobs"}`;

  if (jobs.length === 0) {
    jobGrid.innerHTML = `
      <div class="empty-state">
        No jobs found. Try another search or reset the filters.
      </div>
    `;
    return;
  }

  jobGrid.innerHTML = jobs.map(job => {
    const badgeClass =
      job.type === "Internship"
        ? "job-badge internship"
        : "job-badge";

    return `
      <article class="job-card">
        <div class="job-top">
          <div class="company-avatar">
            ${escapeHTML(job.company.charAt(0).toUpperCase())}
          </div>

          <div>
            <span class="${badgeClass}">
              ${escapeHTML(job.type)}
            </span>

            <h3>${escapeHTML(job.title)}</h3>

            <div class="company-name">
              ${escapeHTML(job.company)}
            </div>
          </div>
        </div>

        <div class="job-meta">
          <span><b>⌖</b>${escapeHTML(job.location)}</span>
          <span><b>◷</b>${escapeHTML(job.salary)}</span>
        </div>

        <button
          class="view-btn"
          type="button"
          data-view-job="${escapeHTML(job.id)}">
          View Job →
        </button>
      </article>
    `;
  }).join("");
}

// ==========================================
// VIEW JOB DETAILS
// ==========================================

function openJob(jobId) {
  activeJob = sampleJobs.find(job => job.id === jobId);

  if (!activeJob) return;

  jobDetails.innerHTML = `
    <h2>${escapeHTML(activeJob.title)}</h2>

    <p class="detail-company">
      ${escapeHTML(activeJob.company)}
    </p>

    <div class="detail-meta">
      <span>⌖ ${escapeHTML(activeJob.location)}</span>
      <span>◷ ${escapeHTML(activeJob.salary)}</span>
      <span>▣ ${escapeHTML(activeJob.type)}</span>
    </div>

    <section class="detail-section">
      <h4>About this job</h4>
      <p>${escapeHTML(activeJob.description)}</p>
    </section>

    <section class="detail-section">
      <h4>Responsibilities</h4>
      <ul>
        ${activeJob.responsibilities.map(item =>
          `<li>${escapeHTML(item)}</li>`
        ).join("")}
      </ul>
    </section>

    <section class="detail-section">
      <h4>Requirements</h4>
      <ul>
        ${activeJob.requirements.map(item =>
          `<li>${escapeHTML(item)}</li>`
        ).join("")}
      </ul>
    </section>

    ${
      activeJob.applyUrl
        ? `<p>
            <a href="${escapeHTML(activeJob.applyUrl)}"
               target="_blank"
               rel="noopener noreferrer">
              Open official application link
            </a>
          </p>`
        : ""
    }
  `;

  jobDialog.showModal();
}

// ==========================================
// OPEN APPLICATION FORM
// ==========================================

function openApplication() {
  if (!activeJob) return;

  applicationForm.reset();

  document.getElementById("applyJobId").value =
    activeJob.id;

  jobDialog.close();
  applyDialog.showModal();
}

// ==========================================
// CLOSE DIALOGS
// ==========================================

function closeDialog(dialog) {
  if (dialog.open) {
    dialog.close();
  }
}

document.querySelector("[data-close-job]")
  .addEventListener("click", () => closeDialog(jobDialog));

document.querySelector("[data-close-apply]")
  .addEventListener("click", () => closeDialog(applyDialog));

[jobDialog, applyDialog].forEach(dialog => {
  dialog.addEventListener("click", event => {
    if (event.target === dialog) {
      closeDialog(dialog);
    }
  });
});

// ==========================================
// VIEW JOB BUTTON
// ==========================================

jobGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-view-job]");

  if (button) {
    openJob(button.dataset.viewJob);
  }
});

startApplyBtn.addEventListener("click", openApplication);

// ==========================================
// SEARCH FORM
// ==========================================

document.getElementById("searchForm")
  .addEventListener("submit", event => {
    event.preventDefault();

    renderJobs();

    document.getElementById("jobs").scrollIntoView({
      behavior: "smooth"
    });
  });

// ==========================================
// FILTER DROPDOWN
// ==========================================

typeFilter.addEventListener("change", () => {
  document.querySelectorAll('input[name="sideType"]')
    .forEach(radio => {
      radio.checked = radio.value === typeFilter.value;
    });

  renderJobs();
});

// ==========================================
// SIDEBAR FILTERS
// ==========================================

document.querySelectorAll('input[name="sideType"]')
  .forEach(radio => {
    radio.addEventListener("change", () => {
      typeFilter.value = radio.value;
      renderJobs();
    });
  });

// ==========================================
// QUICK FILTER BUTTONS
// ==========================================

document.querySelectorAll("[data-quick-filter]")
  .forEach(button => {
    button.addEventListener("click", () => {
      typeFilter.value = button.dataset.quickFilter;

      document.querySelectorAll('input[name="sideType"]')
        .forEach(radio => {
          radio.checked = radio.value === typeFilter.value;
        });

      renderJobs();

      document.getElementById("jobs").scrollIntoView({
        behavior: "smooth"
      });
    });
  });

// ==========================================
// RESET FILTERS
// ==========================================

document.getElementById("resetFilters")
  .addEventListener("click", () => {
    typeFilter.value = "All types";
    searchInput.value = "";

    document.querySelectorAll('input[name="sideType"]')
      .forEach(radio => {
        radio.checked = radio.value === "All types";
      });

    renderJobs();
  });

// ==========================================
// MOBILE MENU
// ==========================================

document.getElementById("menuToggle")
  .addEventListener("click", () => {
    document.getElementById("mainNav")
      .classList.toggle("open");
  });

document.querySelectorAll("#mainNav a")
  .forEach(link => {
    link.addEventListener("click", () => {
      document.getElementById("mainNav")
        .classList.remove("open");
    });
  });

// ==========================================
// CREATE WHATSAPP MESSAGE
// ==========================================

function buildWhatsAppMessage(job, applicant) {
  return [
    "JOB APPLICATION — JobFinder Pro",
    "",
    `Position: ${job.title}`,
    `Company: ${job.company}`,
    `Job type: ${job.type}`,
    `Location: ${job.location}`,
    "",
    "APPLICANT DETAILS",
    `Full name: ${applicant.name}`,
    `Phone: ${applicant.phone}`,
    `Email: ${applicant.email}`,
    `City/Country: ${applicant.location || "Not provided"}`,
    "",
    "Short introduction:",
    applicant.message || "Not provided",
    "",
    applicant.cvName
      ? `CV filename: ${applicant.cvName} (attach PDF manually in WhatsApp)`
      : "CV: Not attached",
    "",
    "Sent from JobFinder Pro"
  ].join("\n");
}

// ==========================================
// SUBMIT APPLICATION
// ==========================================

applicationForm.addEventListener("submit", event => {
  event.preventDefault();

  const jobId =
    document.getElementById("applyJobId").value;

  const job = sampleJobs.find(item => item.id === jobId);

  if (!job) {
    alert("Please choose a job again.");
    return;
  }

  const name =
    document.getElementById("applicantName").value.trim();

  const phone =
    document.getElementById("applicantPhone").value.trim();

  const email =
    document.getElementById("applicantEmail").value.trim();

  const location =
    document.getElementById("applicantLocation").value.trim();

  const message =
    document.getElementById("applicantMessage").value.trim();

  const cvInput =
    document.getElementById("applicantCV");

  const cvFile = cvInput.files && cvInput.files[0];

  if (!name || !phone || !email) {
    alert("Please fill in your name, phone number and email.");
    return;
  }

  if (!/^[0-9+()\-\s]{6,30}$/.test(phone)) {
    alert("Please enter a valid phone number.");
    return;
  }

  if (cvFile) {
    const isPDF =
      cvFile.type === "application/pdf" ||
      cvFile.name.toLowerCase().endsWith(".pdf");

    if (!isPDF || cvFile.size > 5 * 1024 * 1024) {
      alert("Please select a PDF file smaller than 5 MB.");
      return;
    }
  }

  if (
    WHATSAPP_NUMBER.includes("X") ||
    !/^\d{8,15}$/.test(WHATSAPP_NUMBER)
  ) {
    alert(
      "Set your WhatsApp number in script.js first. " +
      "Use the international format with digits only."
    );
    return;
  }

  const applicant = {
    name,
    phone,
    email,
    location,
    message,
    cvName: cvFile ? cvFile.name : ""
  };

  const whatsappMessage =
    buildWhatsAppMessage(job, applicant);

  const whatsappURL =
    `https://wa.me/${WHATSAPP_NUMBER}?text=` +
    encodeURIComponent(whatsappMessage);

  applyDialog.close();

  window.open(
    whatsappURL,
    "_blank",
    "noopener,noreferrer"
  );

  if (cvFile) {
    alert(
      "WhatsApp opened with your application message. " +
      "Attach the selected CV PDF manually, then press Send."
    );
  }
});

// ==========================================
// INITIALIZE WEBSITE
// ==========================================

document.getElementById("year").textContent =
  new Date().getFullYear();

renderJobs();
