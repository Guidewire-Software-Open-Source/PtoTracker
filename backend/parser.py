import csv
from datetime import datetime, timedelta
SICK = "sick"
PTO = "pto"

# If you're a judge and you're reading this code: good luck :)
# Side note, Q4 is one day longer than Q1/Q2/Q3


def open_the_big_file_made_by_GARRETT_and_PAT_and_read_the_data_into_a_list():
    # open and read file
    file_name = "uploads/ptoSick.csv"
    file_data = []
    with open(file_name, "r") as file_ptr:
        reader = csv.reader(file_ptr)
        name = 0
        date = 1
        time_type = 2
        i = 0
        for row in reader:
            if i != 0:
                file_data.append(row[:3])
            i+=1
    return name, date, time_type, file_data

def put_the_raw_data_in_the_washing_machine_and_return_dictionary(file_data, dateI, nameI, typeI):
    people = {}

    # Sort into dictionary where keys are names and values are arrays of tuples of dates and types (each element is a single vacation)
    for row in file_data:
        date = datetime.strptime(row[dateI], '%m/%d/%Y')
        if row[nameI] not in people:
            people[row[nameI]] = [(date, row[typeI])]
        else:
            people[row[nameI]].append((date, row[typeI]))
    return people

def aggregate_quarterly_PTO_and_SICK_per_person(person_data, start, target_PTO, target_SICK):

    # arrays of their vacations
    pto = []
    sick = []
    for occurence in person_data:
        if occurence[1].lower() == SICK:
            sick.append(occurence[0])
        elif occurence[1].lower() == PTO:
            pto.append(occurence[0])

    # end dates of each quarter
    q1_end = start + timedelta(days=91)
    q2_end = start + timedelta(days=182)
    q3_end = start + timedelta(days=273)
    q4_end = start + timedelta(days=365)

    pto_taken = [0, 0, 0, 0]
    sick_taken = [0, 0, 0, 0]

    # Tally quarterly usage
    for day in pto:
        if start < day <= q1_end:
            pto_taken[0] += 1
        elif q1_end < day <= q2_end:
            pto_taken[1] += 1
        elif q2_end < day <= q3_end:
            pto_taken[2] += 1
        elif q3_end < day <= q4_end:
            pto_taken[3] += 1

    for day in sick:
        if start < day <= q1_end:
            sick_taken[0] += 1
        elif q1_end < day <= q2_end:
            sick_taken[1] += 1
        elif q2_end < day <= q3_end:
            sick_taken[2] += 1
        elif q3_end < day <= q4_end:
            sick_taken[3] += 1

    return pto_taken, sick_taken


def calculate_quarterly(properties):
    # properties data
    start = datetime.strptime(properties[0], '%Y-%m-%d')
    target_pto = int(properties[1])
    target_sick = int(properties[2])

    # read input data and clean it
    name, date, time_type, input_data = open_the_big_file_made_by_GARRETT_and_PAT_and_read_the_data_into_a_list()
    cleaned_input = put_the_raw_data_in_the_washing_machine_and_return_dictionary(input_data, date, name, time_type)

    # calculate each person quarterly usage
    people = []
    for person in cleaned_input.keys():
        new_person = {}
        pto_taken, sick_taken = aggregate_quarterly_PTO_and_SICK_per_person(cleaned_input[person], start, target_pto, target_sick)
        new_person["NAME"] = person
        new_person["PTO"] = pto_taken
        new_person["SICK"] = sick_taken
        people.append(new_person)

    # quarterly targets
    quarterly_pto = str(target_pto / 4)
    quarterly_sick = str(target_sick / 4)

    returnable = {}
    returnable["people"] = people
    returnable["target_quarterly_PTO"] = quarterly_pto
    returnable["target_quarterly_SICK"] = quarterly_sick

    return returnable



if __name__ == "__main__":
    print(open_the_big_file_made_by_GARRETT_and_PAT_and_read_the_data_into_a_list()[3])

