using System.Globalization;

namespace Portfolio;

public class Asset
{
    private readonly DateTime _date;

    public Asset(string description, DateTime date, Value value)
    {
        Description = description;
        _date = date;
        Value = value;
    }

    public string Description { get; }

    public DateTime Date => _date.Date;

    public Value Value { get; set; }
}

public abstract class Value
{
    protected readonly float _value;

    protected Value(float value)
    {
        _value = value;
    }

    public float Get()
    {
        return _value;
    }
}

public class MeasurableValue: Value
{
    public MeasurableValue(float value) : base(value)
    { }
    
    public override string ToString()
    {
        return _value.ToString(CultureInfo.CurrentCulture);
    }
}

public class PricelessValue : Value 
{
    public PricelessValue() : base(float.PositiveInfinity)
    { }
}

public class NoValue : Value 
{
    public NoValue() : base(0)
    { }
}

