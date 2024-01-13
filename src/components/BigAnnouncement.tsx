import "../styles/bigannouncement.css";

interface IBigAnnouncementProps {
  title?: string;
  copy: string;
}

export default function BigAnnouncement({
  title,
  copy,
}: IBigAnnouncementProps) {
  return (
    <div className="announcementOuter">
      <div className="announcementInner">
        {title && <h3 className="announcementTitle">{title}</h3>}
        <div className="announcementCopy">{copy}</div>
      </div>
    </div>
  );
}
