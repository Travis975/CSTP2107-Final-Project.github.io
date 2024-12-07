import React from 'react';
import { Link } from 'react-router-dom';
import '../css/homepage.css';

const links = [
  { name: 'Open roles', href: '#' },
  { name: 'Internship program', href: '#' },
  { name: 'Our values', href: '#' },
  { name: 'Meet our leadership', href: '#' },
];

const stats = [
  { name: 'Offices worldwide', value: '12' },
  { name: 'Full-time colleagues', value: '300+' },
  { name: 'Hours per week', value: '40' },
  { name: 'Paid time off', value: 'Unlimited' },
];

const HomePage = () => {
  return (
    <div className="relative bg-gray-900 py-24 sm:py-32">
      {/* Background Image */}
      <img
        alt="Team working together"
        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      {/* Content */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto lg:mx-0 lg:text-left">
          <h2 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
            Work with us
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
            fugiat veniam occaecat fugiat.
          </p>
        </div>
        <div className="mt-10 max-w-2xl mx-auto lg:mx-0 lg:max-w-none">
          <div className="flex flex-wrap justify-center gap-8 text-base font-semibold text-white lg:justify-start">
            {links.map((link) => (
              <a key={link.name} href={link.href} className="hover:underline">
                {link.name} <span aria-hidden="true">&rarr;</span>
              </a>
            ))}
          </div>
          <dl className="mt-16 grid grid-cols-2 gap-8 text-center sm:grid-cols-2 lg:grid-cols-4 lg:text-left">
            {stats.map((stat) => (
              <div key={stat.name} className="flex flex-col gap-1">
                <dt className="text-base font-medium text-gray-400">{stat.name}</dt>
                <dd className="text-4xl font-bold tracking-tight text-white">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        {/* Links to Sign Up, Terms, and Privacy Policy */}
        <div className="mt-16 border-t border-gray-800 pt-8 text-center lg:text-left">
          <div className="text-base font-semibold text-gray-400">
            <Link to="/signup" className="text-white hover:underline">
              Sign Up
            </Link>{' '}
            |{' '}
            <Link to="/terms-and-conditions" className="text-white hover:underline">
              Terms and Conditions
            </Link>{' '}
            |{' '}
            <Link to="/privacy-policy" className="text-white hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
