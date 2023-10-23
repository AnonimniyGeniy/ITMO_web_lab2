<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ru">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.0/jquery.min.js"></script>
<link id="css_main" rel="stylesheet" type="text/css" href="style/main.css">


<head>
  <meta charset="UTF-8">
  <title>lab1</title>
</head>
<body>
<div class="top_block">
  <div class="student_text">
    Студент: Вейгандт Владимир Вячеславович ИСУ 367132
    Вариант №1615
  </div>
  <div class="lab_name">
    <h1>Лабораторная работа №2</h1>
  </div>
</div>
<div id="graph">
</div>
<img src="content/areas.png" alt="area">

</div>
<div class="form_block">
  <form>
    <div class="input_container">
      <label>
        <input type="radio" name="x" value="-5"> -5
      </label>
      <label>
        <input type="radio" name="x" value="-4"> -4
      </label>
      <label>
        <input type="radio" name="x" value="-3"> -3
      </label>
      <label>
        <input type="radio" name="x" value="-2"> -2
      </label>
      <label>
        <input type="radio" name="x" value="-1"> -1
      </label>
      <label>
        <input type="radio" name="x" value="0"> 0
      </label>
      <label>
        <input type="radio" name="x" value="1"> 1
      </label>
      <label>
        <input type="radio" name="x" value="2"> 2
      </label>
      <label>
        <input type="radio" name="x" value="3"> 3
      </label>
    </div>
    <br>
    <div class="input_container">
      <label for="y">Y</label>
      <input type="text" id="y" placeholder="Введите Y" maxlength="9">
      (-5 ... 5 )
    </div>
    <br>

    <div class=input_container>
      <div class=checkbox_container>
        R:
        <input type="checkbox" id=r_1 class="r_checkboxes" name="r_1">
        <label for="r_1" class="checkbox-label">1</label>

        <input type="checkbox" id=r_15 class="r_checkboxes" name="r_15">
        <label for="r_15" class="checkbox-label">1.5</label>

        <input type="checkbox" id=r_2 class="r_checkboxes" name="r_2">
        <label for="r_2" class="checkbox-label">2</label>

        <input type="checkbox" id=r_25 class="r_checkboxes" name="r_25">
        <label for="r_25" class="checkbox-label">2.5</label>

        <input type="checkbox" id=r_3 class="r_checkboxes" name="r_3">
        <label for="r_3" class="checkbox-label">3</label>
      </div>
    </div>

    <br>
    <div class="button_class">
      <button class="SubmitButton" type="button" onclick="validateAndSubmit()">Отправить</button>
    </div>
  </form>
</div>
<div id="result_table" class="result_class">
  <table class="result_table">
    <tr>
      <th>X</th>
      <th>Y</th>
      <th>R</th>
      <th>Результат</th>
      <th>Время работы скрипта</th>
      <th>Время</th>
    </tr>
  </table>

</div>
</body>
<script src="js/val_and_sub.js"></script>
</html>