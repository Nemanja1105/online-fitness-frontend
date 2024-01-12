import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ExercisesService } from '../services/Exercises/exercises.service';
import { CustomSnackBarService } from '../services/CustomSnackBar/custom-snack-bar.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './exercises.component.html',
  styleUrl: './exercises.component.css',
})
export class ExercisesComponent {
  muscle = new FormControl('default');
  level = new FormControl('default');
  muscleSelect = [
    { label: 'Abdominals', value: 'abdominals' },
    { label: 'Abductors', value: 'abductors' },
    { label: 'Adductors', value: 'adductors' },
    { label: 'Biceps', value: 'biceps' },
    { label: 'Calves', value: 'calves' },
    { label: 'Chest', value: 'chest' },
    { label: 'Forearms', value: 'forearms' },
    { label: 'Glutes', value: 'glutes' },
    { label: 'Hamstrings', value: 'hamstrings' },
    { label: 'Lats', value: 'lats' },
    { label: 'Lower Back', value: 'lower_back' },
    { label: 'Middle Back', value: 'middle_back' },
    { label: 'Neck', value: 'neck' },
    { label: 'Quadriceps', value: 'quadriceps' },
    { label: 'Traps', value: 'traps' },
    { label: 'Triceps', value: 'triceps' },
  ];

  levelSelect = [
    { label: 'Beginner', value: 'beginner' },
    { label: 'Intermediate', value: 'intermediate' },
    { label: 'Expert', value: 'expert' },
  ];

  exercises: any;

  constructor(
    private exercisesService: ExercisesService,
    private snackBar: CustomSnackBarService
  ) {
    this.findAll();
  }

  onChange() {
    console.log('change');
    this.findAll();
  }

  findAll() {
    this.exercisesService
      .findExercises(this.muscle.value, this.level.value)
      .subscribe({
        next: (data) => {
          this.exercises = data;
        },
        error: () => {
          this.snackBar.openSnackBar(
            'Error communicating with the server',
            'close',
            false
          );
        },
      });
  }
}
