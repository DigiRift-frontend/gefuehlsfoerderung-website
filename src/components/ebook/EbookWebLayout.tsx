import Image from "next/image";

export type WebChapter = {
  number: number;
  title: string;
  subtitle: string;
  image: string;
  content: React.ReactNode;
  activity?: React.ReactNode; // optional full-page interactive worksheet
};

export type WebEbookConfig = {
  badge: string;
  title: string;
  subtitle: string;
  coverImage: string;
  authorImage: string;
  authorBio: string;
  chapters: WebChapter[];
};

function Footer() {
  return (
    <div className="wb-footer">
      <span>Ewelina Gawlik</span>
      <span className="wb-footer-dot">&bull;</span>
      <span>Gefühlsförderung</span>
      <span className="wb-footer-dot">&bull;</span>
      <span>Leitfaden</span>
    </div>
  );
}

function CoverPage({ config }: { config: WebEbookConfig }) {
  return (
    <div className="wb-page wb-cover">
      <div className="wb-cover-deco-1" />
      <div className="wb-cover-deco-2" />
      <div className="wb-cover-deco-3" />

      <div className="wb-cover-badge">{config.badge}</div>

      <div className="wb-cover-image">
        <Image src={config.coverImage} alt="" fill className="object-cover" sizes="200px" priority />
      </div>

      <h1 className="wb-cover-title">{config.title}</h1>
      <p className="wb-cover-subtitle">{config.subtitle}</p>

      <p className="wb-cover-author">
        Ein Leitfaden von <strong>Ewelina Gawlik</strong>
        <br />Kindheitspädagogin B.A.
      </p>
    </div>
  );
}

function TocPage({ chapters }: { chapters: WebChapter[] }) {
  return (
    <div className="wb-page">
      <div className="wb-toc">
        <h2 className="wb-toc-header">Was dich erwartet</h2>
        <p className="wb-toc-sub">
          10 Kapitel voller Wissen, Alltagstipps und Übungen — damit du deinem
          Kind helfen kannst, Schritt für Schritt mutiger zu werden.
        </p>
        <ol className="wb-toc-list">
          {chapters.map((ch) => (
            <li key={ch.number} className="wb-toc-item">
              <span className="wb-toc-num">{ch.number}</span>
              <div className="wb-toc-text">
                <span className="wb-toc-title">{ch.title}</span>
                <div className="wb-toc-desc">{ch.subtitle}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <Footer />
    </div>
  );
}

function ChapterOpener({ chapter }: { chapter: WebChapter }) {
  return (
    <div className="wb-page wb-chapter-open">
      <div className="wb-chapter-hero">
        <Image src={chapter.image} alt="" fill className="object-cover" sizes="100vw" />
        <div className="wb-chapter-hero-overlay" />
      </div>
      <div className="wb-chapter-info">
        <span className="wb-chapter-num-badge">{chapter.number}</span>
        <h2 className="wb-chapter-h">{chapter.title}</h2>
        <p className="wb-chapter-sub">{chapter.subtitle}</p>
      </div>
      <Footer />
    </div>
  );
}

function ContentPage({ chapter }: { chapter: WebChapter }) {
  return (
    <div className="wb-page">
      <div className="wb-content">
        <div className="wb-content-label">Kapitel {chapter.number}</div>
        <div className="wb-content-body">{chapter.content}</div>
      </div>
      <Footer />
    </div>
  );
}

function ActivityPage({ chapter }: { chapter: WebChapter }) {
  if (!chapter.activity) return null;
  return (
    <div className="wb-page">
      <div className="wb-activity-page">
        <div className="wb-content-label">Arbeitsblatt &bull; Kapitel {chapter.number}</div>
        {chapter.activity}
      </div>
      <Footer />
    </div>
  );
}

function AuthorPage({ config }: { config: WebEbookConfig }) {
  return (
    <div className="wb-page wb-author-page">
      <div className="wb-author-deco-1" />
      <div className="wb-author-deco-2" />
      <div className="wb-author-photo">
        <Image src={config.authorImage} alt="Ewelina Gawlik" fill className="object-cover" sizes="200px" />
      </div>
      <div className="wb-author-label">Über die Autorin</div>
      <h3 className="wb-author-name">Ewelina Gawlik</h3>
      <p className="wb-author-role">Kindheitspädagogin B.A.</p>
      <p className="wb-author-bio">{config.authorBio}</p>
      <div className="wb-author-links">
        <span className="wb-author-link">gefühlsförderung.de</span>
        <span className="wb-author-link">mail@ewelinagawlik.de</span>
      </div>
      <Footer />
    </div>
  );
}

export function EbookWebLayout({ config }: { config: WebEbookConfig }) {
  return (
    <div className="wb-wrapper">
      <CoverPage config={config} />
      <TocPage chapters={config.chapters} />
      {config.chapters.map((chapter) => (
        <div key={chapter.number}>
          <ChapterOpener chapter={chapter} />
          <ContentPage chapter={chapter} />
          {chapter.activity && <ActivityPage chapter={chapter} />}
        </div>
      ))}
      <AuthorPage config={config} />
      <div className="wb-print-bar">
        <button onClick={() => window.print()} className="wb-print-btn">
          Als PDF speichern (Strg+P / Cmd+P)
        </button>
        <p>Tipp: Wähle &quot;Als PDF speichern&quot; als Drucker und deaktiviere Kopf- und Fußzeilen.</p>
      </div>
    </div>
  );
}
