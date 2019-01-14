import React from 'react';
import { Switch, Route } from 'react-router-dom'
import HomePage from '../Home/HomePage'
import AboutPage from '../About/AboutPage'
import CoursesPage from '../Course/CoursesPage';
import ManageCoursePage from '../Course/ManageCoursePage';

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/about' component={AboutPage} />
            <Route path='/courses' component={CoursesPage} />
            <Route exact path='/course' component={ManageCoursePage} />
            <Route path='/course/:id' component={ManageCoursePage} />
        </Switch>
    </main>
);


export default Main;