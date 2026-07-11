import type { KeyboardEvent, ReactNode } from "react";
import Logo from "../assets/DigitalízandoANayarit.png";
import type { Business } from "../types/business";

type BusinessCardProps = {
  business: Business;
  onOpenBusiness: (business: Business) => void;
  sponsored?: boolean;
  showProfileHint?: boolean;
};

type ContentCardProps = {
  children: ReactNode;
  className: string;
};

type CardProps = BusinessCardProps | ContentCardProps;

function isBusinessCard(props: CardProps): props is BusinessCardProps {
  return "business" in props;
}

function Card(props: CardProps) {
  if (!isBusinessCard(props)) {
    return <article className={props.className}>{props.children}</article>;
  }

  const {
    business,
    onOpenBusiness,
    sponsored = false,
    showProfileHint = false,
  } = props;

  const openBusiness = () => onOpenBusiness(business);

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openBusiness();
    }
  };

  return (
    <article
      className={
        sponsored ? "business-card business-card-sponsored" : "business-card"
      }
      onClick={openBusiness}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <div className="business-card-media">
        <img src={business.imageUrl ?? Logo} alt="" />
      </div>
      <div className="card-topline">
        <span>{business.category}</span>
        {sponsored ? (
          <strong>Patrocinado</strong>
        ) : business.verified ? (
          <strong>Verificado</strong>
        ) : (
          <em>Nuevo</em>
        )}
      </div>
      <h3>{business.name}</h3>
      <p>{business.description}</p>
      <div className="business-meta">
        <span>{business.location}</span>
      </div>
      <div className="tag-list">
        {business.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      {showProfileHint ? <span className="profile-hint">Ver perfil</span> : null}
    </article>
  );
}

export default Card;
