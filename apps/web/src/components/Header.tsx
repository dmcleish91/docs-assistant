interface HeaderProps {
  title: string | React.ReactNode;
  subtitle: string | React.ReactNode;
}

export const Header = ({ title, subtitle }: HeaderProps) => (
  <header className='mb-4 md:mb-8 text-center'>
    <h1 className='text-3xl md:text-5xl mb-2 font-bold'>{title}</h1>
    <p className='text-lg md:text-xl opacity-90 m-0'>{subtitle}</p>
  </header>
);
