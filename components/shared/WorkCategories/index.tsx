import { Dispatch, memo, SetStateAction } from 'react';
import { categories, uploadCategories } from 'constants/categories';
import { useRouter } from 'next/router';
import { CategoryButton, CategoryMenus } from './styled';

type Props = {
	selectedCategory: string;
	setSelectedCategory: Dispatch<SetStateAction<string>>;
};

const WorkCategories = ({ selectedCategory, setSelectedCategory }: Props) => {
	const { pathname } = useRouter();

	return (
		<CategoryMenus>
			{pathname === '/mypage/upload'
				? uploadCategories.map((category) => (
						<li key={category.id}>
							<CategoryButton
								type="button"
								onClick={() => setSelectedCategory(category.query)}
								$selected={selectedCategory === category.query}
								aria-selected={selectedCategory === category.query}
							>
								{category.name}
							</CategoryButton>
						</li>
				  ))
				: categories.map((category) => (
						<li key={category.id}>
							<CategoryButton
								type="button"
								onClick={() => setSelectedCategory(category.query)}
								$selected={selectedCategory === category.query}
								aria-selected={selectedCategory === category.query}
							>
								{category.name}
							</CategoryButton>
						</li>
				  ))}
		</CategoryMenus>
	);
};

export default memo(WorkCategories);
