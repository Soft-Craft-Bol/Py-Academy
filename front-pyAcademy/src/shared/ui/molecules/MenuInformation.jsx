export const MenuInformation = ({ information }) => {
  return (
    <div className="col-span-1">
      <h3 className="font-medium text-gray-900 mb-4 dark:text-gray-400">
        {information.title}
      </h3>
      <ul className="space-y-3">
        {information.items.map((item, index) => (
          <li key={index}>
            <a
              href={item.url}
              className="text-gray-600 hover:text-gray-900 text-sm dark:text-white"
            >
              {item.content}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
