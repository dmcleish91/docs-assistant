interface HeaderProps {
  title: string;
  subtitle: string;
}

export const Header = ({ title, subtitle }: HeaderProps) => (
  <header className='mb-8 md:mb-12 text-center'>
    <h1 className='text-3xl md:text-5xl mb-2 font-bold'>{title}</h1>
    <p className='text-lg md:text-xl opacity-90 m-0'>{subtitle}</p>
  </header>
);
