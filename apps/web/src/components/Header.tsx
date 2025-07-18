interface HeaderProps {
  title: string;
  subtitle: string;
}

export const Header = ({ title, subtitle }: HeaderProps) => (
  <header className='App-header'>
    <h1>{title}</h1>
    <p>{subtitle}</p>
  </header>
);
