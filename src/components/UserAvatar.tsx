type Props = {
  name: string;
  image?: string | null;
  size?: number;
  rounded?: "full" | "lg";
};

// Shows the user's photo (Google/GitHub) or the first letter of the name.
const UserAvatar = ({ name, image, size = 28, rounded = "full" }: Props) => {
  const radius = rounded === "full" ? "rounded-full" : "rounded-lg";

  if (image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={image}
        alt={name}
        width={size}
        height={size}
        referrerPolicy="no-referrer"
        className={`shrink-0 object-cover ${radius}`}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <span
      className={`flex shrink-0 items-center justify-center bg-green-100 font-bold text-[#008d3f] ${radius}`}
      style={{ width: size, height: size, fontSize: size * 0.42 }}
      aria-hidden="true"
    >
      {name.charAt(0).toUpperCase()}
    </span>
  );
};

export default UserAvatar;
