/**
 * SearchBar Storybook Stories
 * Visual tests for the search bar component with filters and interactions
 */

import type { Meta, StoryObj } from '@storybook/react';
import SearchBar from './SearchBar';

// Simple mock function for story actions
const mockFn = () => {};

const meta: Meta<typeof SearchBar> = {
  title: 'Molecules/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Search bar component with text input and multiple filter selects for status, gender, and visible columns. Features debounced search and multi-select filters.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Current search value',
    },
    statusValues: {
      control: 'object',
      description: 'Selected status filter values',
    },
    genderValues: {
      control: 'object',
      description: 'Selected gender filter values',
    },
    columnValues: {
      control: 'object',
      description: 'Selected visible column values',
    },
    onChange: {
      action: 'search changed',
      description: 'Callback when search value changes',
    },
    onClear: {
      action: 'search cleared',
      description: 'Callback when search is cleared',
    },
    onStatusChange: {
      action: 'status filter changed',
      description: 'Callback when status filter changes',
    },
    onGenderChange: {
      action: 'gender filter changed',
      description: 'Callback when gender filter changes',
    },
    onColumnsChange: {
      action: 'columns changed',
      description: 'Callback when visible columns change',
    },
  },
  args: {
    value: '',
    statusValues: [],
    genderValues: [],
    columnValues: ['name', 'status', 'species', 'gender'],
    onChange: mockFn,
    onClear: mockFn,
    onStatusChange: mockFn,
    onGenderChange: mockFn,
    onColumnsChange: mockFn,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default State',
  parameters: {
    docs: {
      description: {
        story: 'Default search bar with empty search and no filters applied.',
      },
    },
  },
};

export const WithSearchValue: Story = {
  name: 'With Search Value',
  args: {
    value: 'Rick Sanchez',
  },
  parameters: {
    docs: {
      description: {
        story: 'Search bar with a search term entered.',
      },
    },
  },
};

export const WithFiltersApplied: Story = {
  name: 'With Filters Applied',
  args: {
    value: 'Rick',
    statusValues: ['Alive', 'Dead'],
    genderValues: ['Male'],
    columnValues: ['name', 'status'],
  },
  parameters: {
    docs: {
      description: {
        story: 'Search bar with search term and multiple filters applied.',
      },
    },
  },
};

export const AllFiltersSelected: Story = {
  name: 'All Filters Selected',
  args: {
    statusValues: ['Alive', 'Dead', 'unknown'],
    genderValues: ['Male', 'Female', 'Genderless', 'unknown'],
    columnValues: ['name', 'status', 'species', 'gender'],
  },
  parameters: {
    docs: {
      description: {
        story: 'Search bar with all possible filter options selected.',
      },
    },
  },
};

export const InteractiveSearch: Story = {
  name: 'Interactive Search',
  parameters: {
    docs: {
      description: {
        story:
          'Interactive search bar demonstrating typing and clearing functionality.',
      },
    },
  },
};

export const FilterInteractions: Story = {
  name: 'Filter Interactions',
  parameters: {
    docs: {
      description: {
        story: 'Testing filter dropdown interactions and selections.',
      },
    },
  },
};

export const ResponsiveLayout: Story = {
  name: 'Responsive Layout',
  parameters: {
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '667px' } },
        tablet: {
          name: 'Tablet',
          styles: { width: '768px', height: '1024px' },
        },
        desktop: {
          name: 'Desktop',
          styles: { width: '1200px', height: '800px' },
        },
      },
    },
    docs: {
      description: {
        story:
          'Search bar responsive behavior. On mobile, filters stack vertically. On desktop, they display in a row.',
      },
    },
  },
  args: {
    value: 'Rick',
    statusValues: ['Alive'],
    genderValues: ['Male'],
  },
};

export const AccessibilityTest: Story = {
  name: 'Accessibility Test',
  parameters: {
    docs: {
      description: {
        story:
          'Testing accessibility features including ARIA labels, keyboard navigation, and screen reader support.',
      },
    },
  },
};

export const EmptyStates: Story = {
  name: 'Empty States',
  parameters: {
    docs: {
      description: {
        story:
          'Search bar in various empty states with different placeholder texts and no selections.',
      },
    },
  },
  render: () => (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-semibold mb-2'>No Search, No Filters</h3>
        <SearchBar
          value=''
          statusValues={[]}
          genderValues={[]}
          columnValues={['name', 'status', 'species', 'gender']}
          onChange={mockFn}
          onClear={mockFn}
          onStatusChange={mockFn}
          onGenderChange={mockFn}
          onColumnsChange={mockFn}
        />
      </div>

      <div>
        <h3 className='text-lg font-semibold mb-2'>Minimal Columns</h3>
        <SearchBar
          value=''
          statusValues={[]}
          genderValues={[]}
          columnValues={['name']}
          onChange={mockFn}
          onClear={mockFn}
          onStatusChange={mockFn}
          onGenderChange={mockFn}
          onColumnsChange={mockFn}
        />
      </div>
    </div>
  ),
};

export const LoadingStates: Story = {
  name: 'Loading States',
  parameters: {
    docs: {
      description: {
        story:
          'Search bar with loading indicators and disabled states during search operations.',
      },
    },
  },
  render: () => (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-semibold mb-2'>Normal State</h3>
        <SearchBar
          value='Rick'
          statusValues={['Alive']}
          genderValues={[]}
          columnValues={['name', 'status', 'species', 'gender']}
          onChange={mockFn}
          onClear={mockFn}
          onStatusChange={mockFn}
          onGenderChange={mockFn}
          onColumnsChange={mockFn}
        />
      </div>

      <div>
        <h3 className='text-lg font-semibold mb-2'>With Search Value</h3>
        <SearchBar
          value='Searching...'
          statusValues={[]}
          genderValues={[]}
          columnValues={['name', 'status', 'species', 'gender']}
          onChange={mockFn}
          onClear={mockFn}
          onStatusChange={mockFn}
          onGenderChange={mockFn}
          onColumnsChange={mockFn}
        />
      </div>
    </div>
  ),
};
