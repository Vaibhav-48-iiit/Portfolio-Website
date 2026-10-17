export interface ProjectItem {
  id: string;
  title: string;
  category: "project";
  status: "Completed" | "In Progress" | "Academic Project";
  shortDescription: string;
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
  image?: string;
  repoNote?: string;
  details: {
    overview: string;
    architecture: string;
    tools: string[];
    implementation: string[];
    challenges: string[];
  };
}

export const projectsData: ProjectItem[] = [
  {
    id: "dexa-ai",
    title: "DEXA AI",
    category: "project",
    status: "Completed",
    shortDescription:
      "An AI-powered desktop assistant designed to interact with local applications, files, and everyday computer workflows.",
    tags: ["React", "Node.js", "Express", "MongoDB", "Socket.IO", "Ollama"],
    // Verified repository link
    githubUrl: "https://github.com/Vaibhav-48-iiit/DexaAi",
    demoUrl: "",
    image: "/projects/dexa-ai.jpg",
    details: {
      overview:
        "DEXA AI is a private, locally running desktop assistant designed to bridge local OS interaction with Large Language Models. By running via Ollama, it maintains data privacy while enabling natural language task execution on local files and system processes.",
      architecture:
        "Built with a modular client-server architecture. The React frontend communicates over bidirectional WebSocket connections (Socket.IO) to an Express/Node.js orchestration backend, interfacing directly with local Ollama inference endpoints and a MongoDB metadata store.",
      tools: [
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "Socket.IO",
        "Ollama",
        "Tailwind CSS",
      ],
      implementation: [
        "Constructed streaming token response handling between Ollama local LLM instances and the UI.",
        "Engineered secure command mediation layers to validate file path accesses before execution.",
        "Implemented real-time bi-directional messaging with Socket.IO for minimal latency.",
        "Designed state persistence for conversational contexts and task execution history in MongoDB.",
      ],
      challenges: [
        "Handling context window constraints during multi-turn complex file queries without local memory exhaustion.",
        "Ensuring safe sandboxed command evaluation to prevent unintended shell execution.",
      ],
    },
  },
  {
    id: "distributed-cctv-detection",
    title: "Distributed CCTV Detection",
    category: "project",
    status: "Academic Project",
    shortDescription:
      "A cloud-oriented distributed video analysis system designed to process recorded CCTV footage, identify anomalous events, and organize findings through a web dashboard.",
    tags: ["AWS", "Distributed Processing", "Video Analysis", "Cloud Storage", "Web Dashboard"],
    // Repository is currently private while in development
    githubUrl: "",
    repoNote: "Still building this project — currently repo is private",
    demoUrl: "",
    image: "/projects/cctv-detection.jpg",
    details: {
      overview:
        "An academic exploration into scalable computer vision pipelines. The system processes recorded surveillance streams across distributed worker nodes to detect anomalous events and aggregate flagged timestamps for human security review.",
      architecture:
        "Decoupled pipeline utilizing cloud object storage (AWS S3) for segmented video chunks, worker nodes running frame analysis algorithms, and a centralized web dashboard to present anomaly logs and alert timelines.",
      tools: [
        "AWS Cloud Architecture",
        "Distributed Computing",
        "Python",
        "OpenCV",
        "FastAPI / Node.js",
        "Cloud Storage",
      ],
      implementation: [
        "Segmented video streams into chunked processing queues to enable parallel worker analysis.",
        "Constructed frame difference and object tracking heuristics for baseline anomaly isolation.",
        "Built an interactive security operator dashboard to navigate flagged incidents with timeline scrubbing.",
      ],
      challenges: [
        "Minimizing processing latency while transferring high-bitrate video footage across compute instances.",
        "Balancing false-positive alert thresholds across varying ambient lighting conditions.",
      ],
    },
  },
];
