import { Router } from '@/presentation/components';
import React from 'react';
import ReactDOM from 'react-dom';

import '@/presentation/styles/globals.scss';

import { makeLogin } from '@/main/factories/pages';

ReactDOM.render(<Router makeLogin={makeLogin} />, document.getElementById('main'));