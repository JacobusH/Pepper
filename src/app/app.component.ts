import { Component, OnInit, OnDestroy } from '@angular/core';
import {AngularFire, FirebaseListObservable, AuthProviders, AuthMethods} from 'angularfire2';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  cuisines: FirebaseListObservable<any[]>;
  restaurants: Observable<any[]>;

  constructor(private af: AngularFire)
  {
  
  }

  ngOnInit() {
    this.cuisines = this.af.database.list('/cuisines');
    
    //simple join
    this.restaurants = this.af.database.list('/restaurants')
      .map(restaurants => {
        restaurants.map(restaurant => {
          restaurant.cuisineType = this.af.database.object('/cuisines/' + restaurant.cuisine)
        })
        return restaurants;
      })

    //complex join
    // this.restaurants = this.af.database.list('/restaurants')
    //   .map(restaurants => {
    //     restaurants.map(restaurant => {
    //       restaurant.featureTypes = [];
    //       for(var f in restaurant.features)
    //       {
    //         restaurant.featureTypes.push(this.af.database.object('/features/' + f));
    //       }
    //     })

    //     return restaurants;
    //   })

      ////query objects
      // this.restaurants = this.af.database.list('/restaurants', {
      //   query: {
      //     orderByChild: 'rating',
      //     startAt: 3,
      //     limitToFirst: 50
      //   }
      // })

      //updating multiple
      // this.af.database.list('/restaurants').push({name: ''})
      //   .then(x => {
      //     let restaurant = {name: 'My New restaurant'};
      //     let update = {};

      //     update['restaurants/' + x.key] = restaurant;
      //     update['restaurants-by-city/camberwell/' + x.key] = restaurant;
      //   })

      this.af.auth.subscribe(authState => {
        if(!authState)
        {
          console.log("not logged in");
        }
        else
        {
          console.log("logged in", authState);
        }
      })
  }

  add()
  {
    this.cuisines.push({
      name: 'Asian',
      details: {
        description: '...'
      }
    })
  }

  update()
  {
    this.af.database.object('/restaurant').update({
      name: 'New name',
      rating: 5
    })
  }

  login()
  {
    this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup
    }).then(authState => {
      console.log("After Login", authState);
    })
  }

  logout()
  {
    this.af.auth.logout();
  }

}
