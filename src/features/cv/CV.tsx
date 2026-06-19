import {
	Code2,
	Cpu,
	Database,
	GitBranch,
	Key,
	Server,
	Shield,
	Terminal,
	Wrench,
	Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";

interface Project {
	title: string;
	category: string;
	description: { label: string; text: string }[];
	tags: string[];
}

interface Skill {
	name: string;
	category: "languages" | "frameworks" | "databases" | "devops";
	level: "Advanced" | "Intermediate";
}

const CATEGORY_NAMES: Record<Skill["category"], string> = {
	languages: "Programming Languages",
	frameworks: "Frameworks & Libraries",
	databases: "Databases & Storage",
	devops: "DevOps & Tools",
};

const SKILL_SLUGS: Record<string, string> = {
	PHP: "php",
	JavaScript: "javascript",
	TypeScript: "typescript",
	Python: "python",
	Golang: "go",
	Java: "java",
	Laravel: "laravel",
	ElysiaJS: "elysia",
	"Next.js": "nextdotjs",
	React: "react",
	"Tailwind CSS": "tailwindcss",
	DaisyUI: "daisyui",
	LangChain: "langchain",
	CodeIgniter: "codeigniter",
	"Vue.js": "vuedotjs",
	Flask: "flask",
	Gin: "go",
	MySQL: "mysql",
	PostgreSQL: "postgresql",
	Supabase: "supabase",
	LanceDB: "database",
	SQLite: "sqlite",
	Prisma: "prisma",
	"Docker (Compose)": "docker",
	"Git & GitHub": "git",
	Bash: "gnubash",
	"Linux (Debian/Ubuntu)": "linux",
	SSH: "openssh",
	UFW: "linux",
	Vim: "vim",
	"VS Code": "visualstudiocode",
};

const getSkillIcon = (skill: Skill) => {
	// 1. Check for specific Lucide icons first (where a clear, high-quality match exists)
	if (skill.name === "Git & GitHub") {
		return <GitBranch className="h-3.5 w-3.5 text-zinc-300 shrink-0" />;
	}
	if (skill.name === "Bash") {
		return <Terminal className="h-3.5 w-3.5 text-zinc-300 shrink-0" />;
	}
	if (skill.name === "SSH") {
		return <Key className="h-3.5 w-3.5 text-zinc-300 shrink-0" />;
	}
	if (skill.name === "UFW") {
		return <Shield className="h-3.5 w-3.5 text-zinc-300 shrink-0" />;
	}

	// 2. Fallback to Simple Icons brand logo if mapped
	const slug = SKILL_SLUGS[skill.name];
	if (slug && slug !== "database") {
		return (
			<img
				src={`https://cdn.simpleicons.org/${slug}`}
				alt=""
				className="h-3.5 w-3.5 object-contain shrink-0 filter brightness-90 saturate-75 hover:brightness-100 hover:saturate-100 transition-all"
				loading="lazy"
			/>
		);
	}

	// 3. Fallback to category-based Lucide icons
	const categoryClass = "h-3.5 w-3.5 text-zinc-400 shrink-0";
	switch (skill.category) {
		case "languages":
			return <Code2 className={categoryClass} />;
		case "frameworks":
			return <Cpu className={categoryClass} />;
		case "databases":
			return <Database className={categoryClass} />;
		case "devops":
			return <Server className={categoryClass} />;
		default:
			return <Wrench className={categoryClass} />;
	}
};

const SKILLS: Skill[] = [
	// Languages
	{ name: "PHP", category: "languages", level: "Advanced" },
	{ name: "JavaScript", category: "languages", level: "Advanced" },
	{ name: "TypeScript", category: "languages", level: "Advanced" },
	{ name: "Python", category: "languages", level: "Intermediate" },
	{ name: "Golang", category: "languages", level: "Intermediate" },
	{ name: "Java", category: "languages", level: "Intermediate" },
	// Frameworks & Libs
	{ name: "Laravel", category: "frameworks", level: "Advanced" },
	{ name: "ElysiaJS", category: "frameworks", level: "Advanced" },
	{ name: "Next.js", category: "frameworks", level: "Advanced" },
	{ name: "React", category: "frameworks", level: "Advanced" },
	{ name: "Tailwind CSS", category: "frameworks", level: "Advanced" },
	{ name: "DaisyUI", category: "frameworks", level: "Advanced" },
	{ name: "LangChain", category: "frameworks", level: "Intermediate" },
	{ name: "CodeIgniter", category: "frameworks", level: "Intermediate" },
	{ name: "Vue.js", category: "frameworks", level: "Intermediate" },
	{ name: "Flask", category: "frameworks", level: "Intermediate" },
	{ name: "Gin", category: "frameworks", level: "Intermediate" },
	// Databases
	{ name: "MySQL", category: "databases", level: "Advanced" },
	{ name: "PostgreSQL", category: "databases", level: "Advanced" },
	{ name: "Supabase", category: "databases", level: "Intermediate" },
	{ name: "LanceDB", category: "databases", level: "Intermediate" },
	{ name: "SQLite", category: "databases", level: "Intermediate" },
	{ name: "Prisma", category: "databases", level: "Intermediate" },
	// DevOps & Tools
	{ name: "Docker (Compose)", category: "devops", level: "Advanced" },
	{ name: "Git & GitHub", category: "devops", level: "Advanced" },
	{ name: "Bash", category: "devops", level: "Intermediate" },
	{ name: "Linux (Debian/Ubuntu)", category: "devops", level: "Intermediate" },
	{ name: "SSH", category: "devops", level: "Intermediate" },
	{ name: "UFW", category: "devops", level: "Intermediate" },
	{ name: "Vim", category: "devops", level: "Intermediate" },
	{ name: "VS Code", category: "devops", level: "Advanced" },
];

const PROJECTS: Project[] = [
	{
		title: "Smart Assistant SMKN 32 Jakarta",
		category: "Backend & AI Project",
		description: [
			{
				label: "Backend & API",
				text: "Mengembangkan sistem di balik layar yang sangat cepat menggunakan ElysiaJS dan Bun untuk dipasang langsung pada antarmuka website sekolah.",
			},
			{
				label: "AI Integration",
				text: "Membuat fitur asisten pintar dengan LangChain dan Groq API, yang mampu memproses dan menjawab pertanyaan berdasarkan dokumen internal sekolah.",
			},
			{
				label: "Database",
				text: "Mengelola pencarian konteks data menggunakan local embeddings dan menyimpannya di LanceDB agar hasil pencarian teks lebih akurat.",
			},
		],
		tags: ["ElysiaJS", "Bun", "LangChain", "Groq API", "LanceDB"],
	},
	{
		title: "My-Catatan",
		category: "Full-Stack Project",
		description: [
			{
				label: "Frontend",
				text: "Membangun tampilan aplikasi pengelola catatan yang responsif dan interaktif menggunakan React, Tailwind CSS, dan DaisyUI.",
			},
			{
				label: "Backend & Database",
				text: "Merancang alur pengelolaan data catatan dari awal hingga akhir (pembuatan, pembacaan, pembaruan, penghapusan) yang terhubung langsung dengan sistem database eksternal.",
			},
		],
		tags: ["React", "Tailwind CSS", "DaisyUI", "PostgreSQL"],
	},
	{
		title: "Bouncy Asep - 2D Java Game",
		category: "Programming Logic Project",
		description: [
			{
				label: "Logika Pemrograman",
				text: "Mengembangkan game 2D dengan gaya permainan menyerupai Flappy Bird dari nol, menggunakan bahasa Java dan LibGDX.",
			},
			{
				label: "Mekanika Sistem",
				text: "Menulis logika permainan utama secara mandiri, termasuk perhitungan gravitasi dan deteksi tabrakan karakter dengan rintangan.",
			},
		],
		tags: ["Java", "LibGDX", "Game Dev", "Algorithms"],
	},
	{
		title: "Self-Hosted Home Infrastructure",
		category: "Personal Project",
		description: [
			{
				label: "Infrastructure as Code",
				text: "Membangun environment server berbasis Debian Linux untuk men-deploy berbagai layanan web dan media stack menggunakan Docker Compose.",
			},
			{
				label: "Networking & Security",
				text: "Mengonfigurasi Reverse Proxy (Caddy/Nginx) dan TLS untuk akses publik yang aman, serta mengelola firewall (UFW) untuk perlindungan server.",
			},
			{
				label: "System Optimization",
				text: "Melakukan tuning performa pada aplikasi yang berjalan di atas JVM dan memantau resource server untuk stabilitas sistem.",
			},
		],
		tags: ["Debian", "Docker Compose", "Caddy", "Nginx", "UFW", "JVM Tuning"],
	},
];

export default function CV() {
	const [skillFilter, setSkillFilter] = useState<
		"all" | "languages" | "frameworks" | "databases" | "devops"
	>("all");

	useEffect(() => {
		document.title = "Julius Wahyu Wicaksono | CV - JDT-17";
	}, []);

	return (
		<div className="min-h-screen bg-zinc-950 text-zinc-150 flex flex-col relative overflow-hidden">
			{/* Top thin bar for Back to Hub navigation */}
			<div className="w-full bg-zinc-950/80 border-b border-zinc-900/40 py-2 relative z-20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-start">
					<Button
						asChild
						variant="ghost"
						className="text-zinc-455 hover:text-zinc-100 hover:bg-zinc-900 group gap-1.5 rounded-xl text-xs font-semibold h-9 md:h-8 px-3 md:px-2.5 flex items-center cursor-pointer"
					>
						<Link to="/">
							<svg
								className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={2.5}
							>
								<title>Arrow Left</title>
								<path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
							</svg>
							Back to Hub Portal
						</Link>
					</Button>
				</div>
			</div>

			<div className="flex-1 flex flex-col items-center justify-start px-4 py-12 relative z-10 w-full">
				{/* Color radial glow backdrop */}
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-150 h-150 bg-linear-to-tr from-amber-500/5 to-orange-500/5 blur-[130px] rounded-full pointer-events-none" />

				<div className="w-full max-w-4xl relative">
					{/* Header Badge */}
					<div className="flex justify-end mb-6">
						<Badge
							variant="outline"
							className="border-zinc-800 text-amber-500 py-1 px-3 text-[10px] uppercase font-bold tracking-widest"
						>
							Interactive CV
						</Badge>
					</div>

					{/* Header Section */}
					<header className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start pb-8 border-b border-zinc-900 mb-8">
						<div className="md:col-span-2 text-left space-y-4">
							<div>
								<h1 className="text-4xl font-extrabold text-zinc-50 tracking-tight mb-2">
									Julius Wahyu Wicaksono
								</h1>
								<p className="text-amber-500 text-lg font-bold">Backend & Web Developer</p>
							</div>
							<p className="text-zinc-400 text-sm leading-relaxed">
								Backend & Web Developer dengan fondasi logika pemrograman kuat dan fokus pada
								efisiensi operasional. Mahasiswa tingkat akhir Teknik Informatika berspesialisasi
								dalam Full-Stack Development (React, Bun, Node.js) dan integrasi Artificial
								Intelligence (LangChain). Berpengalaman praktis merancang arsitektur API, mengelola
								relasional dan vektor database (Supabase, LanceDB), serta melakukan deployment pada
								environment Linux menggunakan Docker.
							</p>
						</div>

						<div className="space-y-3.5 bg-zinc-900/30 border border-zinc-850 p-6 rounded-2xl text-sm text-left">
							<h2 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
								Contact Info
							</h2>
							<div className="flex items-center gap-2.5">
								<svg
									className="w-4 h-4 text-amber-500 shrink-0"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={2}
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
									/>
								</svg>
								<a
									href="mailto:julius.wahwic@gmail.com"
									className="hover:text-amber-500 hover:underline transition-colors"
								>
									julius.wahwic@gmail.com
								</a>
							</div>
							<div className="flex items-center gap-2.5">
								<svg
									className="w-4 h-4 text-amber-500 shrink-0"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={2}
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
									/>
								</svg>
								<span>Jakarta Timur, Jakarta, Indonesia</span>
							</div>
							<div className="flex items-center gap-2.5">
								<svg
									className="w-4 h-4 text-amber-500 shrink-0"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={2}
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
									/>
								</svg>
								<a
									href="https://linkedin.com/in/julius-wahwic"
									target="_blank"
									rel="noreferrer"
									className="hover:text-amber-500 hover:underline transition-colors"
								>
									linkedin.com/in/julius-wahwic
								</a>
							</div>
						</div>
					</header>

					{/* Content Sections */}
					<main className="text-left space-y-16">
						{/* Experience & Education Section */}
						<section id="experience" className="space-y-12">
							{/* Experience Timeline */}
							<div>
								<h2 className="text-lg font-extrabold text-zinc-50 mb-6 flex items-center gap-2">
									<span className="h-2 w-2 rounded-full bg-amber-500" /> Work Experience
								</h2>

								<div className="relative border-l border-zinc-850 pl-6 space-y-10 ml-1">
									{/* Item 1 */}
									<div className="relative">
										<div className="absolute -left-[31px] top-1.5 h-4 w-4 rounded-full border border-amber-500 bg-zinc-950" />
										<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
											<div>
												<h3 className="font-bold text-zinc-50 text-base">Asisten Laboratorium</h3>
												<p className="text-zinc-400 text-sm">
													Laboratorium Informatika Universitas Gunadarma · Paruh Waktu
												</p>
											</div>
											<Badge
												variant="outline"
												className="border-zinc-800 text-amber-500 shrink-0 self-start sm:self-auto px-2.5 py-0.5"
											>
												Mar 2024 - Mei 2025
											</Badge>
										</div>
										<ul className="list-disc list-outside ml-4 text-zinc-400 text-sm space-y-2 leading-relaxed">
											<li>
												<strong className="text-zinc-350">Teaching & Mentoring:</strong> Mengajar
												algoritma & logika pemrograman (
												<strong className="text-zinc-300">Python & Golang</strong>) kepada 30+
												mahasiswa, memperkuat pemahaman fundamental struktur data.
											</li>
											<li>
												<strong className="text-zinc-350">Curriculum Development:</strong> Merancang
												modul praktikum terstandarisasi yang relevan dengan kebutuhan industri saat
												ini, termasuk penerapan
												<em className="text-zinc-300"> clean code</em>.
											</li>
											<li>
												<strong className="text-zinc-350">Technical Troubleshooting:</strong>{" "}
												Mendiagnosa dan memecahkan masalah teknis lingkungan pengembangan secara{" "}
												<em className="text-zinc-300">real-time</em> demi kelancaran operasional.
											</li>
										</ul>
									</div>

									{/* Item 2 */}
									<div className="relative">
										<div className="absolute -left-[31px] top-1.5 h-4 w-4 rounded-full border border-zinc-800 bg-zinc-950" />
										<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
											<div>
												<h3 className="font-bold text-zinc-50 text-base">
													Full-stack Web Developer
												</h3>
												<p className="text-zinc-400 text-sm">
													SMK Negeri 1 Kota Bekasi · Magang/PKL
												</p>
											</div>
											<Badge
												variant="outline"
												className="border-zinc-800 text-zinc-550 shrink-0 self-start sm:self-auto px-2.5 py-0.5"
											>
												Okt 2020 - Mar 2021
											</Badge>
										</div>
										<ul className="list-disc list-outside ml-4 text-zinc-400 text-sm space-y-2 leading-relaxed">
											<li>
												<strong className="text-zinc-350">Full-Cycle Development:</strong>{" "}
												Bertanggung jawab penuh atas siklus pengembangan aplikasi mulai dari
												perancangan sistem, desain database, hingga implementasi fitur.
											</li>
											<li>
												<strong className="text-zinc-350">Backend Engineering:</strong>{" "}
												Mengembangkan logika sisi server yang aman menggunakan{" "}
												<strong className="text-zinc-300">PHP dan MySQL</strong>, memastikan
												integritas data untuk proses pemilihan digital.
											</li>
										</ul>
									</div>
								</div>
							</div>

							{/* Education Section */}
							<div className="pt-6 border-t border-zinc-900">
								<h2 className="text-lg font-extrabold text-zinc-50 mb-6 flex items-center gap-2">
									<span className="h-2 w-2 rounded-full bg-amber-500" /> Education
								</h2>

								<div className="space-y-6">
									<div className="flex justify-between items-start gap-4">
										<div>
											<h3 className="font-bold text-zinc-50 text-base">Universitas Gunadarma</h3>
											<p className="text-zinc-400 text-sm">Teknik Informatika</p>
										</div>
										<Badge
											variant="secondary"
											className="border-zinc-800 bg-zinc-900/50 text-zinc-350"
										>
											2022 - Sekarang
										</Badge>
									</div>

									<div className="flex justify-between items-start gap-4">
										<div>
											<h3 className="font-bold text-zinc-50 text-base">SMK Negeri 1 Kota Bekasi</h3>
											<p className="text-zinc-400 text-sm">Rekayasa Perangkat Lunak</p>
										</div>
										<Badge
											variant="secondary"
											className="border-zinc-800 bg-zinc-900/50 text-zinc-400"
										>
											2019 - 2022
										</Badge>
									</div>
								</div>
							</div>
						</section>

						<div className="h-px bg-zinc-900 my-16" />

						{/* Skills Section */}
						<section id="skills" className="space-y-6">
							<h2 className="text-xl font-extrabold text-zinc-50 mb-8 flex items-center gap-2.5">
								<span className="h-2.5 w-2.5 bg-amber-500 rounded-full" /> Technical Skills
							</h2>
							<div className="flex flex-wrap gap-1.5 py-1 border-b border-zinc-900 mb-6">
								{(["all", "languages", "frameworks", "databases", "devops"] as const).map(
									(filterOpt) => (
										<button
											key={filterOpt}
											type="button"
											onClick={() => setSkillFilter(filterOpt)}
											className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
												skillFilter === filterOpt
													? "bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/10"
													: "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40"
											}`}
										>
											{filterOpt === "all"
												? "All Skills"
												: filterOpt === "devops"
													? "DevOps & Tools"
													: filterOpt}
										</button>
									),
								)}
							</div>{" "}
							{/* Grouped Skills Tag List */}
							<div className="space-y-8">
								{(
									(skillFilter === "all"
										? ["languages", "frameworks", "databases", "devops"]
										: [skillFilter]) as Skill["category"][]
								).map((categoryKey) => {
									const categorySkills = SKILLS.filter((s) => s.category === categoryKey);
									if (categorySkills.length === 0) return null;
									return (
										<div key={categoryKey} className="space-y-3">
											<h3 className="text-xs font-bold uppercase tracking-wider text-amber-500/90 border-l-2 border-amber-500 pl-2">
												{CATEGORY_NAMES[categoryKey]}
											</h3>
											<div className="flex flex-wrap gap-2.5 pt-1">
												{categorySkills.map((skill) => (
													<div
														key={skill.name}
														className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border select-none transition-all duration-300 ${
															skill.level === "Advanced"
																? "bg-amber-500/5 border-amber-500/15 hover:border-amber-500/40 hover:bg-amber-500/10"
																: "bg-zinc-900/30 border-zinc-850 hover:border-zinc-700/60 hover:bg-zinc-900/60"
														}`}
													>
														{getSkillIcon(skill)}
														<span className="text-xs font-medium text-zinc-150">{skill.name}</span>
														<span
															className={`flex items-center gap-1 text-[8px] font-black tracking-wider uppercase px-1 rounded-sm ${
																skill.level === "Advanced"
																	? "bg-amber-500/10 text-amber-400/90"
																	: "bg-zinc-950 text-zinc-550 border border-zinc-850"
															}`}
														>
															{skill.level === "Advanced" ? (
																<>
																	<Zap className="h-2 w-2 text-amber-500 fill-amber-500/20 shrink-0" />
																	ADV
																</>
															) : (
																<>
																	<Shield className="h-2 w-2 text-zinc-500 shrink-0" />
																	INT
																</>
															)}
														</span>
													</div>
												))}
											</div>
										</div>
									);
								})}
							</div>
							{/* Certifications Box */}
							<div className="pt-10 border-t border-zinc-900 mt-10">
								<h2 className="text-lg font-extrabold text-zinc-50 mb-6 flex items-center gap-2">
									<span className="h-2 w-2 rounded-full bg-amber-500" /> Certifications &
									Credentials
								</h2>

								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<Card className="border border-zinc-850/60 bg-zinc-950/20 p-5 rounded-2xl flex flex-col justify-between text-left">
										<div>
											<h3 className="font-bold text-zinc-50 text-sm mb-1">
												Junior Mobile Programmer (VSGA)
											</h3>
											<p className="text-zinc-500 text-xs">Kementerian Kominfo RI</p>
										</div>
										<Badge
											variant="outline"
											className="mt-4 border-zinc-800 text-amber-500/90 py-0.5 px-2 self-start text-[10px]"
										>
											Credential ID: VSGA-Kominfo
										</Badge>
									</Card>

									<Card className="border border-zinc-850/60 bg-zinc-950/20 p-5 rounded-2xl flex flex-col justify-between text-left">
										<div>
											<h3 className="font-bold text-zinc-50 text-sm mb-1">
												Flutter Mobile Development
											</h3>
											<p className="text-zinc-500 text-xs">Edspert.id</p>
										</div>
										<Badge
											variant="outline"
											className="mt-4 border-zinc-800 text-zinc-500 py-0.5 px-2 self-start text-[10px]"
										>
											Course Graduate
										</Badge>
									</Card>

									<Card className="border border-zinc-850/60 bg-zinc-950/20 p-5 rounded-2xl flex flex-col justify-between text-left">
										<div>
											<h3 className="font-bold text-zinc-50 text-sm mb-1">
												Software Engineering Level II
											</h3>
											<p className="text-zinc-500 text-xs">BNSP</p>
										</div>
										<Badge
											variant="outline"
											className="mt-4 border-zinc-800 text-zinc-500 py-0.5 px-2 self-start text-[10px]"
										>
											National Certification
										</Badge>
									</Card>

									<Card className="border border-zinc-850/60 bg-zinc-950/20 p-5 rounded-2xl flex flex-col justify-between text-left">
										<div>
											<h3 className="font-bold text-zinc-50 text-sm mb-1">
												English Proficiency (TOEIC)
											</h3>
											<p className="text-zinc-500 text-xs">Global Exam System</p>
										</div>
										<div className="mt-4 flex items-center justify-between w-full">
											<Badge
												variant="outline"
												className="border-zinc-800 text-amber-500 py-0.5 px-2 text-[10px]"
											>
												Score: 870
											</Badge>
											<span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
												Professional Working
											</span>
										</div>
									</Card>
								</div>
							</div>
						</section>

						<div className="h-px bg-zinc-900 my-16" />

						{/* Projects Section */}
						<section id="projects" className="space-y-6">
							<h2 className="text-xl font-extrabold text-zinc-50 mb-8 flex items-center gap-2.5">
								<span className="h-2.5 w-2.5 bg-amber-500 rounded-full" /> Featured Projects
							</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{PROJECTS.map((proj) => (
									<Card
										key={proj.title}
										className="border border-zinc-850 bg-zinc-900/10 hover:border-amber-500/25 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/2"
									>
										<div>
											<div className="flex items-center justify-between mb-4 gap-2">
												<Badge
													variant="secondary"
													className="border-transparent text-[9px] uppercase font-black tracking-wider py-0.5 px-2.5 bg-amber-500/10 text-amber-500"
												>
													{proj.category}
												</Badge>
											</div>
											<CardTitle className="text-lg font-bold text-zinc-50 mb-4 text-left">
												{proj.title}
											</CardTitle>
											<div className="space-y-3">
												{proj.description.map((desc) => (
													<div key={desc.label} className="text-xs leading-relaxed text-left">
														<strong className="text-zinc-350 block mb-0.5">{desc.label}</strong>
														<span className="text-zinc-450">{desc.text}</span>
													</div>
												))}
											</div>
										</div>

										<div className="mt-6 flex flex-wrap gap-1.5 border-t border-zinc-900/60 pt-4">
											{proj.tags.map((tag) => (
												<Badge
													key={tag}
													variant="outline"
													className="border-zinc-850 text-zinc-500 text-[10px] py-0 px-2 font-medium"
												>
													{tag}
												</Badge>
											))}
										</div>
									</Card>
								))}
							</div>
						</section>
					</main>
				</div>
			</div>
		</div>
	);
}
