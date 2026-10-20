/* =====================================
   JOBFINDER PRO - CONFIGURATION
===================================== */

// Replace with your Lebanese WhatsApp number.
// Example format: 96131234567
const WHATSAPP_NUMBER = "96170160784";


/* =====================================
   JOBS DATABASE
   Add new jobs inside this array.
===================================== */

const jobs = [
  {
    title: "Junior Web Developer",
    company: "Tech Lebanon",
    location: "Tripoli, Lebanon",
    salary: "$500–$800 / month",
    type: "Full-time",
    description:
      "Build and maintain modern websites with a development team."
  },
  {
    title: "UI/UX Design Intern",
    company: "Creative Studio",
    location: "Beirut, Lebanon",
    salary: "Paid internship",
    type: "Internship",
    description:
      "Help design modern interfaces and improve user experiences."
  },
  {
    title: "Customer Support Agent",
    company: "Digital Connect",
    location: "Remote",
    salary: "$400–$600 / month",
    type: "Remote",
    description:
      "Help customers and answer questions using online tools."
  },
  {
    title: "Part-time Sales Assistant",
    company: "Smart Retail",
    location: "Tripoli, Lebanon",
    salary: "$250–$400 / month",
    type: "Part-time",
    description:
      "Assist customers and support daily store operations."
  },
  {
    title: "Frontend Developer",
    company: "Future Apps",
    location: "Remote",
    salary: "$700–$1,200 / month",
    type: "Remote",
    description:
      "Create responsive interfaces using HTML, CSS and JavaScript."
  },
  {
    title: "Marketing Assistant",
    company: "Growth Lebanon",
    location: "Beirut, Lebanon",
    salary: "$400–$650 / month",
    type: "Full-time",
    description:
      "Support marketing campaigns and create digital content."
  },
   {
    title: "Chef de parti (hot or cold section)",
    company: "Latin American cuisine",
    location: "Naccache, Beirut",
    salary: " starting 850$ / month",
    type: " 3pm - 12am",
    description:
      "."
  },
  
];


/* =====================================
   HTML ELEMENTS
===================================== */

const jobsGrid = document.getElementById("jobsGrid");
const searchInput = document.getElementById("searchInput");
const searchForm = document.getElementById("searchForm");
const typeFilter = document.getElementById("typeFilter");
const resetButton = document.getElementById("resetButton");
const jobCount = document.getElementById("jobCount");
const emptyMessage = document.getElementById("emptyMessage");

const jobModal = document.getElementById("jobModal");
const closeModal = document.getElementById("closeModal");
const modalApply = document.getElementById("modalApply");


/* =====================================
   SECURITY HELPER
===================================== */

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}


/* =====================================
   DISPLAY AND FILTER JOBS
===================================== */

function displayJobs() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const selectedType = typeFilter.value;

  const filteredJobs = jobs
    .map((job, index) => ({ ...job, originalIndex: index }))
    .filter((job) => {
      const searchableText = [
        job.title,
        job.company,
        job.location,
        job.description,
        job.type,
        job.time,
        job.salary
      ].join(" ").toLowerCase();

      const matchesSearch = searchableText.includes(searchTerm);

      const matchesType =
        selectedType === "all" || job.type === selectedType;

      return matchesSearch && matchesType;
    });

  jobCount.textContent =
    `${filteredJobs.length} ${
      filteredJobs.length === 1 ? "job" : "jobs"
    }`;

  emptyMessage.hidden = filteredJobs.length > 0;

  jobsGrid.innerHTML = filteredJobs.map((job) => `
    <article class="job-card">

      <div class="job-top">
        <div class="company-icon">
          ${escapeHTML(job.company.trim().charAt(0).toUpperCase())}
        </div>

        <span class="job-type">
          ${escapeHTML(job.type)}
        </span>
      </div>

      <h3>${escapeHTML(job.title)}</h3>

      <p class="company-name">
        ${escapeHTML(job.company)}
      </p>

      <p class="job-description">
        ${escapeHTML(job.description)}
      </p>

      <div class="job-meta">
        <span>📍 ${escapeHTML(job.location)}</span>
        <span>🕒 ${escapeHTML(job.type)}</span>
      </div>

      <div class="job-bottom">
        <span class="salary">
          ${escapeHTML(job.salary)}
        </span>

        <button
          class="apply-button view-job-button"
          type="button"
          data-index="${job.originalIndex}">
          View Job →
        </button>
      </div>

    </article>
  `).join("");
}


/* =====================================
   OPEN JOB DETAILS
===================================== */

jobsGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".view-job-button");

  if (!button) return;

  const index = Number(button.dataset.index);
  const job = jobs[index];

  if (!job) return;

  document.getElementById("modalTitle").textContent =
    job.title;

  document.getElementById("modalCompany").textContent =
    job.company;

  document.getElementById("modalLocation").textContent =
    job.location;

  document.getElementById("modalSalary").textContent =
    job.salary;

  document.getElementById("modalType").textContent =
    job.type;

  document.getElementById("modalDescription").textContent =
    job.description;

  // Build a WhatsApp application message.
  const message = [
    "Hello! I want to apply for this job.",
    "",
    "Job: " + job.title,
    "Company: " + job.company,
    "Location: " + job.location,
    "Salary: " + job.salary,
    "",
    "My name: ",
    "My experience: "
  ].join("\n");

  modalApply.href =
    "https://wa.me/" +
    WHATSAPP_NUMBER +
    "?text=" +
    encodeURIComponent(message);

  modalApply.target = "_blank";
  modalApply.rel = "noopener noreferrer";
  modalApply.hidden = false;

  jobModal.hidden = false;
  document.body.style.overflow = "hidden";
});


/* =====================================
   CLOSE JOB DETAILS
===================================== */

function closeJobModal() {
  jobModal.hidden = true;
  document.body.style.overflow = "";
}

closeModal.addEventListener("click", closeJobModal);

jobModal.addEventListener("click", (event) => {
  if (event.target.hasAttribute("data-close-modal")) {
    closeJobModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !jobModal.hidden) {
    closeJobModal();
  }
});


/* =====================================
   SEARCH AND FILTER EVENTS
===================================== */

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  displayJobs();

  document.getElementById("jobs").scrollIntoView({
    behavior: "smooth"
  });
});

searchInput.addEventListener("input", displayJobs);

typeFilter.addEventListener("change", displayJobs);

resetButton.addEventListener("click", () => {
  searchInput.value = "";
  typeFilter.value = "all";
  displayJobs();
});


/* =====================================
   INITIALIZE WEBSITE
===================================== */

document.getElementById("year").textContent =
  new Date().getFullYear();

displayJobs();
