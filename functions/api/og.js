import { ImageResponse } from '@cloudflare/pages-plugin-vercel-og/api';

const products = {
  gas: { name: 'Gallon of Gas', icon: '⛽', start: '$0.27', end: '$3.50', multiplier: '13x' },
  eggs: { name: 'Dozen Eggs', icon: '🥚', start: '$0.60', end: '$4.50', multiplier: '7.5x' },
  movie: { name: 'Movie Ticket', icon: '🎬', start: '$0.46', end: '$11.75', multiplier: '25x' },
  minimum_wage: { name: 'Minimum Wage', icon: '💵', start: '$0.75/hr', end: '$7.25/hr', multiplier: '9.7x' },
  rent: { name: 'Average Rent', icon: '🏠', start: '$42/mo', end: '$1,750/mo', multiplier: '42x' },
  home: { name: 'Median Home', icon: '🏡', start: '$7,354', end: '$420,000', multiplier: '57x' },
  tuition: { name: 'College Tuition', icon: '🎓', start: '$600/yr', end: '$32,000/yr', multiplier: '53x' },
  car: { name: 'New Car', icon: '🚗', start: '$1,510', end: '$48,000', multiplier: '32x' },
  milk: { name: 'Gallon of Milk', icon: '🥛', start: '$0.83', end: '$4.25', multiplier: '5x' },
  bread: { name: 'Loaf of Bread', icon: '🍞', start: '$0.14', end: '$1.95', multiplier: '14x' },
  stamp: { name: 'Postage Stamp', icon: '📮', start: '$0.03', end: '$0.73', multiplier: '24x' },
  coffee: { name: 'Cup of Coffee', icon: '☕', start: '$0.10', end: '$3.75', multiplier: '38x' },
  bigmac: { name: 'Big Mac', icon: '🍔', start: '$0.65', end: '$6.50', multiplier: '10x' },
};

// Helper to create React-like elements
function h(type, props, ...children) {
  return { type, props: { ...props, children: children.length === 1 ? children[0] : children } };
}

export async function onRequestGet({ request }) {
  // Default to gas product
  const product = products.gas;

  const element = h('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      backgroundColor: '#f5f5f0',
      padding: '40px',
    }
  },
    h('div', {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: '24px',
        padding: '40px',
        width: '90%',
        height: '90%',
      }
    },
      // Header with icon and name
      h('div', {
        style: {
          display: 'flex',
          alignItems: 'center',
          marginBottom: '20px',
        }
      },
        h('span', { style: { fontSize: '56px', marginRight: '16px' } }, product.icon),
        h('span', { style: { fontSize: '48px', fontWeight: 'bold', color: '#171717' } }, product.name)
      ),
      // Subtitle
      h('div', {
        style: { fontSize: '24px', color: '#6b7280', marginBottom: '40px' }
      }, 'Price history from 1950 to 2024'),
      // Price boxes
      h('div', {
        style: {
          display: 'flex',
          flexDirection: 'row',
          gap: '20px',
          marginBottom: '30px',
        }
      },
        h('div', {
          style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#f9fafb',
            borderRadius: '16px',
            padding: '24px',
          }
        },
          h('span', { style: { fontSize: '18px', color: '#6b7280' } }, 'In 1950'),
          h('span', { style: { fontSize: '36px', fontWeight: 'bold', color: '#171717' } }, product.start)
        ),
        h('div', {
          style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#f9fafb',
            borderRadius: '16px',
            padding: '24px',
          }
        },
          h('span', { style: { fontSize: '18px', color: '#6b7280' } }, 'In 2024'),
          h('span', { style: { fontSize: '36px', fontWeight: 'bold', color: '#171717' } }, product.end)
        ),
        h('div', {
          style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#171717',
            borderRadius: '30px',
            padding: '16px 32px',
          }
        },
          h('span', { style: { fontSize: '28px', fontWeight: 'bold', color: 'white' } }, product.multiplier)
        )
      ),
      // Branding
      h('div', {
        style: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '30px',
        }
      },
        h('span', { style: { fontSize: '28px', fontWeight: 'bold', color: '#171717' } }, 'PriceThen'),
        h('span', { style: { fontSize: '18px', color: '#6b7280' } }, 'What your money was really worth')
      )
    )
  );

  return new ImageResponse(element, {
    width: 1200,
    height: 630,
  });
}
