import '../styles/components/Tag.scss';

type TagProps = {
  tagName: string;
  backgroundColor?: string;
  color?: string;
  fontSize?: "xxs" | "xxxs"
  margin?: "medium" | "small"
  fontWeight?: "normal" | "medium"
};

type TagStyle = {
  backgroundColor?: string;
  color?: string;
  fontSize?: number;
  margin?: string | number;
  fontWeight?: number;
};

const Tag = ({ tagName, backgroundColor, color, fontSize, margin, fontWeight }: TagProps) => {
  const style: TagStyle = {};
  if (backgroundColor) {
    style.backgroundColor = backgroundColor;
  }
  if (color) {
    style.color = color;
  }
  if (fontSize === 'xxs') {
    style.fontSize = 14
  }
  else if (fontSize === 'xxxs') {
    style.fontSize = 12;
  }
  if (margin === 'small') {
    style.margin = '5px 0 8px 0';
  }
  if (fontWeight === 'medium') {
    style.fontWeight = 600;
  }

  return (
    <div className="Tag" style={style}>
      { tagName }
    </div>
  );
};

export default Tag;