
import { Button } from "@/components/ui/button";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export const CategoryFilter = ({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Button
        variant={selectedCategory === null ? "default" : "outline"}
        size="sm"
        onClick={() => onSelectCategory(null)}
        className={selectedCategory === null ? "bg-skillspark-500 hover:bg-skillspark-600" : ""}
      >
        All
      </Button>
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          size="sm"
          onClick={() => onSelectCategory(category)}
          className={selectedCategory === category ? "bg-skillspark-500 hover:bg-skillspark-600" : ""}
        >
          {category}
        </Button>
      ))}
    </div>
  );
};
