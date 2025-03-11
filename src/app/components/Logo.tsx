interface LogoProps {
  className?: string;
}

/**
 * The Logo component renders the application logo.
 *
 * @component
 * @example
 * // Example usage:
 * <Logo />
 *
 * @returns {JSX.Element} Renders an HTML element containing the application logo.
 */
const Logo: React.FC<LogoProps> = ({ className = "" }): JSX.Element => {
  return (
    <div className={`logo-container ${className}`}>
      <img src="logo-skysnap-sq.webp" alt="Logo SkySnap" />
    </div>
  );
};

export default Logo;
