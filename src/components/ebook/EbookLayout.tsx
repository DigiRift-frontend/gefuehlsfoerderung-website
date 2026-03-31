import Image from "next/image";

/* ---------- shared types ---------- */
export type Chapter = {
  number: number;
  title: string;
  subtitle?: string;
  image?: string;
  content: React.ReactNode;
};

export type EbookConfig = {
  seriesTitle: string;
  issueLabel: string;
  coverImage: string;
  coverSubheading: string;
  coverHeadline: string;
  badgeText: string;
  chapters: Chapter[];
  authorImage: string;
  authorBio: string;
};

/* ---------- page shell ---------- */
function Page({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`ebook-page ${className}`}>
      {children}
      <footer className="ebook-footer">
        <span>EWELINA GAWLIK</span>
        <span className="ebook-footer-x">&#10005;</span>
        <span>LEITFADEN</span>
      </footer>
    </div>
  );
}

/* ---------- cover ---------- */
function CoverPage({ config }: { config: EbookConfig }) {
  return (
    <div className="ebook-page ebook-cover">
      {/* full-bleed photo */}
      <div className="ebook-cover-image">
        <Image src={config.coverImage} alt="" fill className="object-cover" sizes="100vw" priority />
        <div className="ebook-cover-overlay" />
      </div>

      <div className="ebook-cover-content">
        <h1 className="ebook-cover-brand">GEFÜHLE</h1>
        <p className="ebook-cover-series">{config.issueLabel}</p>

        <div className="ebook-cover-text">
          <p className="ebook-cover-sub">{config.coverSubheading}</p>
          <h2 className="ebook-cover-headline">{config.coverHeadline}</h2>
        </div>

        <div className="ebook-cover-badge">
          <span>{config.badgeText}</span>
        </div>

        <p className="ebook-cover-publisher">EWELINA GAWLIK VERLAG</p>
      </div>
    </div>
  );
}

/* ---------- TOC ---------- */
function TocPage({ chapters, tocImage }: { chapters: Chapter[]; tocImage: string }) {
  return (
    <Page>
      <div className="ebook-toc">
        <div className="ebook-toc-left">
          <h2 className="ebook-toc-title">INHALT</h2>
          <ol className="ebook-toc-list">
            {chapters.map((ch) => (
              <li key={ch.number}>
                <span className="ebook-toc-num">{ch.number}.</span>
                <span className="ebook-toc-label">{ch.title.toUpperCase()}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="ebook-toc-right">
          <Image src={tocImage} alt="" fill className="object-cover" sizes="50vw" />
        </div>
      </div>
    </Page>
  );
}

/* ---------- chapter opener ---------- */
function ChapterOpener({ chapter }: { chapter: Chapter }) {
  return (
    <Page>
      <div className="ebook-chapter-opener">
        {chapter.image && (
          <div className="ebook-chapter-image">
            <Image src={chapter.image} alt="" fill className="object-cover" sizes="60vw" />
          </div>
        )}
        <div className="ebook-chapter-meta">
          <span className="ebook-chapter-number">
            {String(chapter.number).padStart(2, "0")}
          </span>
          <h2 className="ebook-chapter-title">{chapter.title.toUpperCase()}</h2>
          {chapter.subtitle && (
            <p className="ebook-chapter-subtitle">{chapter.subtitle}</p>
          )}
        </div>
      </div>
    </Page>
  );
}

/* ---------- content page ---------- */
function ContentPage({ chapter }: { chapter: Chapter }) {
  return (
    <Page>
      <div className="ebook-content">
        <h3 className="ebook-content-chapter">KAPITEL {chapter.number}</h3>
        <div className="ebook-content-body">{chapter.content}</div>
      </div>
    </Page>
  );
}

/* ---------- author page ---------- */
function AuthorPage({ config }: { config: EbookConfig }) {
  return (
    <Page className="ebook-author-page">
      <div className="ebook-author">
        <div className="ebook-author-photo">
          <Image
            src={config.authorImage}
            alt="Ewelina Gawlik"
            fill
            className="object-cover"
            sizes="200px"
          />
        </div>
        <h3 className="ebook-author-name">Über die Autorin</h3>
        <p className="ebook-author-title">Ewelina Gawlik</p>
        <p className="ebook-author-role">Kindheitspädagogin B.A.</p>
        <p className="ebook-author-bio">{config.authorBio}</p>
        <div className="ebook-author-links">
          <p>www.gefühlsförderung.de</p>
          <p>mail@ewelinagawlik.de</p>
        </div>
      </div>
    </Page>
  );
}

/* ---------- main layout ---------- */
export function EbookLayout({ config }: { config: EbookConfig }) {
  // pick an image for the TOC from chapter 1 or 2
  const tocImage =
    config.chapters.find((c) => c.image)?.image ?? config.coverImage;

  return (
    <div className="ebook-wrapper">
      <CoverPage config={config} />
      <TocPage chapters={config.chapters} tocImage={tocImage} />
      {config.chapters.map((chapter) => (
        <div key={chapter.number}>
          <ChapterOpener chapter={chapter} />
          <ContentPage chapter={chapter} />
        </div>
      ))}
      <AuthorPage config={config} />

      {/* Print button (hidden in print) */}
      <div className="ebook-print-bar">
        <button onClick={() => window.print()} className="ebook-print-btn">
          Als PDF speichern (Strg+P / Cmd+P)
        </button>
        <p>Tipp: Wähle &quot;Als PDF speichern&quot; als Drucker und deaktiviere Kopf- und Fußzeilen.</p>
      </div>
    </div>
  );
}
