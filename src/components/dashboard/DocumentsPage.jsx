"use client";
import { useRef, useState } from "react";

// ─── Mock data (schema-aligned) ───────────────────────────────────────────────

const MOCK_TENANT = {
    id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    business_name: "Artisan Brews Co.",
    business_profile: {
        operating_hours: "Mon–Fri: 9:00 AM – 6:00 PM, Sat: 10:00 AM – 4:00 PM",
        location: "42 Brew Street, Old Town, Lahore",
        delivery_options: "Free local delivery on orders over $50. Standard $5 flat rate otherwise.",
    },
};

const INITIAL_DOCUMENTS = [
    {
        id: "d1",
        file_name: "Product FAQ.pdf",
        file_type: "pdf",
        file_size_bytes: 204800,
        status: "ready",
        chunk_count: 42,
        document_type: "faq",
        created_at: "2025-06-01T10:00:00Z",
        error_message: null,
        version: 1,
    },
    {
        id: "d2",
        file_name: "Company Handbook.docx",
        file_type: "docx",
        file_size_bytes: 524288,
        status: "processing",
        chunk_count: null,
        document_type: "policy",
        created_at: "2025-06-15T14:30:00Z",
        error_message: null,
        version: 1,
    },
    {
        id: "d3",
        file_name: "Pricing Table.pdf",
        file_type: "pdf",
        file_size_bytes: 102400,
        status: "failed",
        chunk_count: null,
        document_type: "pricing",
        created_at: "2025-06-20T09:15:00Z",
        error_message: "File could not be parsed — content may be corrupted.",
        version: 1,
    },
    {
        id: "d4",
        file_name: "Contact List.txt",
        file_type: "txt",
        file_size_bytes: 8192,
        status: "ready",
        chunk_count: 8,
        document_type: "contacts",
        created_at: "2025-06-25T16:00:00Z",
        error_message: null,
        version: 2,
    },
    {
        id: "d5",
        file_name: "Onboarding Guide.docx",
        file_type: "docx",
        file_size_bytes: 358400,
        status: "ready",
        chunk_count: 27,
        document_type: "guide",
        created_at: "2025-07-01T08:30:00Z",
        error_message: null,
        version: 1,
    },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatBytes(bytes) {
    if (!bytes) return "—";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(iso) {
    return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

const FILE_ICON = { pdf: "picture_as_pdf", docx: "description", txt: "text_snippet" };

const FILE_ICON_STYLE = {
    pdf: "bg-error-container text-error",
    docx: "bg-primary-container/20 text-primary",
    txt: "bg-surface-container-high text-on-surface-variant",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }) {
    if (status === "ready") {
        return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Ready
            </span>
        );
    }
    if (status === "processing") {
        return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant text-xs font-medium">
                <span className="material-symbols-outlined text-[14px] animate-spin">sync</span>
                Processing
            </span>
        );
    }
    return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-error-container text-error text-xs font-medium">
            <span className="material-symbols-outlined text-[14px]">error</span>
            Failed
        </span>
    );
}

// ─── Upload dialog ────────────────────────────────────────────────────────────
// Modal dialog used for both "Upload" (target === null) and "Replace"
// (target === existing doc). Opens on top of the documents list — no page
// swap. Functional: a real file picker + drag-and-drop, then the chosen file
// lands in the document list.

function UploadDialog({ target, onUpload, onClose }) {
    const inputRef = useRef(null);
    const [dragging, setDragging] = useState(false);
    const [error, setError] = useState("");

    const ACCEPTED = ["pdf", "docx", "txt"];
    const MAX_BYTES = 10 * 1024 * 1024;

    const handleFile = (file) => {
        if (!file) return;
        const ext = file.name.split(".").pop().toLowerCase();
        if (!ACCEPTED.includes(ext)) {
            setError(`Unsupported format ".${ext}" — use PDF, DOCX or TXT.`);
            return;
        }
        if (file.size > MAX_BYTES) {
            setError("File is larger than 10 MB.");
            return;
        }
        setError("");
        onUpload(file, ext);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        handleFile(e.dataTransfer.files?.[0]);
    };

    return (
        <div
            className="fixed inset-0 z-70 flex items-center justify-center bg-black/40 backdrop-blur-sm p-6"
            onClick={onClose}
        >
            <div
                role="dialog"
                aria-modal="true"
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-lg rounded-2xl bg-surface-container-lowest border border-outline-variant/40 shadow-2xl overflow-hidden animate-rm-slidein"
            >
                {/* Header */}
                <div className="flex items-center justify-between gap-3 px-6 py-5 border-b border-outline-variant/40">
                    <div className="flex items-center gap-3 min-w-0">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-container/40 text-primary">
                            <span className="material-symbols-outlined text-[20px]">
                                {target ? "sync_alt" : "note_add"}
                            </span>
                        </span>
                        <div className="min-w-0">
                            <h2 className="text-base font-semibold text-on-surface leading-snug">
                                {target ? "Replace document" : "Upload document"}
                            </h2>
                            <p className="text-sm text-on-surface-variant mt-0.5 truncate">
                                {target
                                    ? <>New file for <span className="font-medium text-on-surface">{target.file_name}</span> (v{target.version} → v{target.version + 1})</>
                                    : "Add a new document to your AI knowledge base."}
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-1.5 hover:bg-surface-container-high rounded-full shrink-0" title="Close">
                        <span className="material-symbols-outlined text-on-surface-variant text-[20px]">close</span>
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 flex flex-col gap-4">
                {/* Dropzone */}
                <button
                    onClick={() => inputRef.current?.click()}
                    onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={handleDrop}
                    className={`flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 py-10 transition-all ${
                        dragging
                            ? "border-primary bg-primary-container/30 scale-[1.01]"
                            : "border-outline-variant/70 bg-surface-container-lowest hover:border-primary/60 hover:bg-primary-container/10"
                    }`}
                >
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-lg shadow-primary/25">
                        <span className="material-symbols-outlined text-[24px]">upload_file</span>
                    </span>
                    <div className="text-center">
                        <p className="text-sm font-semibold text-on-surface">Upload from device</p>
                        <p className="text-xs text-on-surface-variant mt-1">Click to browse, or drag &amp; drop a file here</p>
                    </div>
                    <span className="rounded-full bg-surface-container-high px-3 py-1 text-xs text-on-surface-variant">
                        PDF · DOCX · TXT — max 10 MB
                    </span>
                </button>

                {error && (
                    <div className="flex items-start gap-2 rounded-xl bg-error-container px-4 py-3 text-sm text-error">
                        <span className="material-symbols-outlined text-[18px] shrink-0">error</span>
                        <span className="min-w-0">{error}</span>
                    </div>
                )}

                <input
                    ref={inputRef}
                    type="file"
                    accept=".pdf,.docx,.txt"
                    className="hidden"
                    onChange={(e) => { handleFile(e.target.files?.[0]); e.target.value = ""; }}
                />
                </div>
            </div>
        </div>
    );
}

function DocumentRow({ doc, onDelete, onReplace }) {
    const isProcessing = doc.status === "processing";
    const isFailed = doc.status === "failed";

    return (
        <div className={`flex flex-col md:grid md:grid-cols-12 gap-3 px-6 py-4 items-center transition-colors hover:bg-surface-container-low ${isFailed ? "bg-error-container/10" : ""}`}>
            {/* File name + icon */}
            <div className="col-span-5 flex items-center gap-3 w-full min-w-0">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${FILE_ICON_STYLE[doc.file_type]}`}>
                    <span className="material-symbols-outlined text-[20px]">{FILE_ICON[doc.file_type]}</span>
                </div>
                <div className="min-w-0">
                    <p className="text-sm font-medium text-on-surface truncate">{doc.file_name}</p>
                    <p className="text-xs text-on-surface-variant/60 mt-0.5">
                        {formatBytes(doc.file_size_bytes)} · v{doc.version} · {formatDate(doc.created_at)}
                        {doc.chunk_count ? ` · ${doc.chunk_count} chunks` : ""}
                    </p>
                    {isFailed && doc.error_message && (
                        <p className="text-xs text-error mt-0.5">{doc.error_message}</p>
                    )}
                </div>
            </div>

            {/* Status */}
            <div className="col-span-3 w-full flex justify-start">
                <StatusBadge status={doc.status} />
            </div>

            {/* Actions */}
            <div className="col-span-4 w-full flex justify-end gap-2">
                <button
                    disabled={isProcessing}
                    onClick={() => onReplace(doc)}
                    className="px-3 py-1.5 border border-outline-variant text-on-surface text-sm rounded-lg hover:bg-surface-container transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    Replace
                </button>
                <button
                    onClick={() => onDelete(doc.id)}
                    className="px-3 py-1.5 text-sm text-error rounded-lg hover:bg-error-container/60 transition-colors"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function DocumentsPage() {
    const [documents, setDocuments] = useState(INITIAL_DOCUMENTS);
    const [profile, setProfile] = useState(MOCK_TENANT.business_profile);
    const [saved, setSaved] = useState(false);
    // null = closed · "new" = upload dialog · doc object = replace dialog
    const [uploadTarget, setUploadTarget] = useState(null);

    const handleDelete = (id) => setDocuments((prev) => prev.filter((d) => d.id !== id));

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    // Uploaded file lands in the list as "processing", then flips to "ready".
    const finishProcessing = (id) => {
        setTimeout(() => {
            setDocuments((prev) =>
                prev.map((d) =>
                    d.id === id
                        ? { ...d, status: "ready", chunk_count: Math.max(4, Math.round(d.file_size_bytes / 12000)), error_message: null }
                        : d
                )
            );
        }, 1800);
    };

    const handleUpload = (file, ext) => {
        if (uploadTarget && uploadTarget !== "new") {
            // Replace an existing document — bump the version.
            const id = uploadTarget.id;
            setDocuments((prev) =>
                prev.map((d) =>
                    d.id === id
                        ? { ...d, file_name: file.name, file_type: ext, file_size_bytes: file.size, status: "processing", chunk_count: null, version: d.version + 1, created_at: new Date().toISOString() }
                        : d
                )
            );
            finishProcessing(id);
        } else {
            const id = `d${Date.now()}`;
            setDocuments((prev) => [
                { id, file_name: file.name, file_type: ext, file_size_bytes: file.size, status: "processing", chunk_count: null, document_type: "custom", created_at: new Date().toISOString(), error_message: null, version: 1 },
                ...prev,
            ]);
            finishProcessing(id);
        }
        setUploadTarget(null);
    };

    return (
        <div className="overflow-y-auto flex-1 px-gutter md:px-xl pb-gutter md:pb-xl pt-lg custom-scrollbar">
            {uploadTarget !== null && (
                <UploadDialog
                    target={uploadTarget === "new" ? null : uploadTarget}
                    onUpload={handleUpload}
                    onClose={() => setUploadTarget(null)}
                />
            )}
            <div className="max-w-4xl mx-auto flex flex-col gap-lg">
                {/* Page heading */}
                <section className="shrink-0">
                    <h2 className="text-2xl font-medium text-on-surface">Knowledge Base</h2>
                    <p className="text-body-sm text-on-surface-variant mt-1">
                        Manage the documents and business info that power your AI responses.
                    </p>
                </section>

                {/* ── Core Business Information ── */}
                <div className="glass-card p-6 flex flex-col gap-5 !rounded-2xl hover:!translate-y-0">
                    <div>
                        <h3 className="text-base font-medium text-on-surface">Core Business Information</h3>
                        <p className="text-xs text-on-surface-variant mt-0.5">
                            Static details the AI references instantly — from your business profile.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div>
                            <label className="block text-[11px] font-medium text-on-surface-variant uppercase tracking-[0.06em] mb-1.5">
                                Operating Hours
                            </label>
                            <textarea
                                rows={2}
                                value={profile.operating_hours}
                                onChange={(e) => setProfile({ ...profile, operating_hours: e.target.value })}
                                className="w-full rounded-xl border border-outline-variant/50 bg-surface-container-low text-sm text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary px-3 py-2.5 resize-none transition-all"
                                placeholder="e.g. Mon–Fri: 9 AM – 6 PM"
                            />
                        </div>
                        <div>
                            <label className="block text-[11px] font-medium text-on-surface-variant uppercase tracking-[0.06em] mb-1.5">
                                Business Location
                            </label>
                            <input
                                type="text"
                                value={profile.location}
                                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                                className="w-full rounded-xl border border-outline-variant/50 bg-surface-container-low text-sm text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary px-3 py-2.5 transition-all"
                                placeholder="e.g. 123 Main Street, Lahore"
                            />
                        </div>
                        <div>
                            <label className="block text-[11px] font-medium text-on-surface-variant uppercase tracking-[0.06em] mb-1.5">
                                Delivery Options &amp; Rates
                            </label>
                            <textarea
                                rows={2}
                                value={profile.delivery_options}
                                onChange={(e) => setProfile({ ...profile, delivery_options: e.target.value })}
                                className="w-full rounded-xl border border-outline-variant/50 bg-surface-container-low text-sm text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary px-3 py-2.5 resize-none transition-all"
                                placeholder="e.g. Free delivery on orders over $50"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            onClick={handleSave}
                            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary rounded-full text-sm font-medium hover:bg-primary/90 active:scale-95 transition-all shadow-sm shadow-primary/20"
                        >
                            {saved ? (
                                <>
                                    <span className="material-symbols-outlined text-[16px]">check</span>
                                    Saved
                                </>
                            ) : (
                                "Save Info"
                            )}
                        </button>
                    </div>
                </div>

                {/* ── Document Management ── */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-base font-medium text-on-surface">Uploaded Documents</h3>
                            <p className="text-xs text-on-surface-variant mt-0.5">
                                {documents.length} document{documents.length !== 1 ? "s" : ""}
                            </p>
                        </div>
                        <button
                            onClick={() => setUploadTarget("new")}
                            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary rounded-full text-sm font-medium hover:bg-primary/90 active:scale-95 transition-all shadow-sm shadow-primary/20"
                        >
                            <span className="material-symbols-outlined text-[18px]">upload_file</span>
                            Upload
                        </button>
                    </div>

                    {/* Table */}
                    <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 overflow-hidden shadow-sm">
                        {/* Table header */}
                        <div className="hidden md:grid grid-cols-12 gap-3 px-6 py-3 bg-surface-container-low border-b border-outline-variant/30 text-[11px] font-medium text-on-surface-variant uppercase tracking-[0.06em]">
                            <div className="col-span-5">Document</div>
                            <div className="col-span-3">Status</div>
                            <div className="col-span-4 text-right">Actions</div>
                        </div>

                        {/* Rows */}
                        <div className="divide-y divide-outline-variant/20">
                            {documents.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-16 text-on-surface-variant/40 gap-2">
                                    <span className="material-symbols-outlined text-4xl">folder_open</span>
                                    <p className="text-sm">No documents uploaded yet.</p>
                                </div>
                            ) : (
                                documents.map((doc) => (
                                    <DocumentRow key={doc.id} doc={doc} onDelete={handleDelete} onReplace={setUploadTarget} />
                                ))
                            )}
                        </div>
                    </div>

                    {/* Hint */}
                    <div className="flex items-start gap-3 frosted-glass rounded-xl px-4 py-3 border-l-4 border-l-secondary-container hover:!translate-y-0">
                        <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5 msym-fill">lightbulb</span>
                        <p className="text-xs text-on-surface-variant leading-relaxed">
                            Supported formats: <span className="font-medium text-on-surface">PDF, DOCX, TXT</span>. Max size: 10 MB per file. Documents are chunked and indexed for AI retrieval automatically.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
