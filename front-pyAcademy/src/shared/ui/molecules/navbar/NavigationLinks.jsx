import { NavigationLink } from '../../atoms/NavigationLink';

function NavigationLinks({ options }) {
  console.log(options);
  return (
    <nav className="hidden md:block">
      <ul className="flex space-x-8">
        {options.map((option, index) => {
          return <NavigationLink text={option.title} to={option.to} key={index} />;
        })}
      </ul>
    </nav>
  );
}

export default NavigationLinks;
